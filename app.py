# app.py
import os
import json
import uuid
from random import sample
import re
import smtplib
import ssl
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from flask_migrate import Migrate

# local imports (models, admin auth)
from models import db, Product, Order
from admin_auth import login_manager, init_admin_user, verify_admin
from data.toys import get_toys_by_category  # New import
# Load environment variables
load_dotenv()

app = Flask(__name__, template_folder="templates", static_folder="static")
app.config['APPLICATION_ROOT'] = '/mandarin'

def prefix_routes(app, prefix):
    """Clone all /api routes with a /mandarin prefix."""
    for rule in list(app.url_map.iter_rules()):
        if rule.rule.startswith('/api'):
            new_rule = f"{prefix}{rule.rule}"
            # Avoid duplicates
            if not any(r.rule == new_rule for r in app.url_map.iter_rules()):
                app.add_url_rule(
                    new_rule,
                    endpoint=f"{rule.endpoint}_mandarin",
                    view_func=app.view_functions[rule.endpoint],
                    methods=rule.methods,
                )

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'christmas-shop-secret-key-2023')

# PostgreSQL Configuration (env fallback)
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'christmas_shop')
SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

SQLALCHEMY_DATABASE_URI

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
login_manager.init_app(app)
login_manager.login_view = 'admin_login'

# Email validation
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

# SMTP config (optional) - if present, app will attempt to send emails
SMTP_HOST = os.getenv('SMTP_HOST')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587')) if os.getenv('SMTP_PORT') else None
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')
EMAIL_FROM = os.getenv('EMAIL_FROM', SMTP_USER or f'no-reply@{os.getenv("MAIL_DOMAIN","localhost")}')

ADMIN_NOTIFICATION_EMAIL = os.getenv('ADMIN_NOTIFICATION_EMAIL')  # optional admin email to notify about orders


def send_email(to_address: str, subject: str, body: str):
    """
    Send a simple plain-text email using SMTP details from env.
    If SMTP is not configured, the function will just print the message to the console (safe fallback).
    """
    message = f"From: {EMAIL_FROM}\r\nTo: {to_address}\r\nSubject: {subject}\r\n\r\n{body}"
    if SMTP_HOST and SMTP_PORT and SMTP_USER and SMTP_PASS:
        try:
            context = ssl.create_default_context()
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
                server.starttls(context=context)
                server.login(SMTP_USER, SMTP_PASS)
                server.sendmail(EMAIL_FROM, [to_address], message.encode('utf-8'))
            app.logger.info(f"Sent email to {to_address} via {SMTP_HOST}:{SMTP_PORT}")
            return True
        except Exception as e:
            app.logger.exception(f"Failed to send email to {to_address}: {e}")
            return False
    else:
        # fallback — no SMTP configured
        app.logger.info("SMTP not configured — email output below:\n" + "-" * 40 + f"\nTo: {to_address}\nSubject: {subject}\n\n{body}\n" + "-" * 40)
        return False


from sqlalchemy import event
from sqlalchemy.engine import Engine

@event.listens_for(Engine, "connect")
def set_search_path(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("SET search_path TO newyear_shop;")
    cursor.close()


@app.route('/')
def index():
    """
    Serve the tree animation page with new layout.
    """

    products = Product.query.order_by(Product.id).all()
    if not products:
        # Return an empty list (front-end may show placeholders) or a small seed.
        return jsonify([])
    return render_template('index.html')


# NEW: Category-based toy endpoints
@app.route('/toys/<category>', methods=['GET'])
def get_toys_by_category_endpoint(category):
    """
    Return JSON list of toys for the specified category.
    Categories: all, small, big, for-business (accepts for-business or for_business)
    """
    # Normalize category name
    category = category.replace('-', '_').lower()
    
    if category not in ['all', 'small', 'big', 'for_business']:
        return jsonify({'error': 'Invalid category'}), 400
    
    toys = get_toys_by_category(category)
    return jsonify(toys)


# NEW: Order endpoint with simplified payload
@app.route('/order', methods=['POST'])
def create_santa_order():
    """
    Create an order from Santa message form.
    Expects JSON:
    {
      "customer": { "name": "...", "email": "..." },
      "message": "...",
      "items": [{ "id": 1, "qty": 2 }, ...]
    }
    """
    try:
        data = request.get_json() or {}
        
        # Validate required fields
        customer = data.get('customer', {})
        customer_name = customer.get('name', '').strip()
        email = customer.get('email', '').strip()
        message = data.get('message', '').strip()
        items = data.get('items', [])
        
        if not customer_name:
            return jsonify({'error': 'Customer name is required'}), 400
        if not message:
            return jsonify({'error': 'Message to Santa is required'}), 400
        if not items or len(items) == 0:
            return jsonify({'error': 'Order must contain at least one item'}), 400
        if email and not re.match(EMAIL_REGEX, email):
            return jsonify({'error': 'Valid email is required if provided'}), 400
        
        # Generate order ID
        order_id = str(uuid.uuid4())
        
        # In a real app, you would save to database here
        app.logger.info(f"Santa order received: {order_id} from {customer_name}")
        
        # Build confirmation (in real app, you'd use the actual product data)
        total = sum([get_toy_price(item['id']) * item['qty'] for item in items])
        
        # Send confirmation if email provided
        if email:
            subject = "🎅 Your Letter to Santa Has Been Received!"
            body = f"Dear {customer_name},\n\nThank you for your letter to Santa! We've received your Christmas wishes.\n\nYour order reference: {order_id}\nTotal items: {len(items)}\nEstimated value: ${total:.2f}\n\nSanta's elves are working hard to prepare your gifts!\n\nMerry Christmas!\nSanta's Workshop"
            send_email_success = send_email(email, subject, body)
        
        response = {
            "status": "ok",
            "order_id": order_id,
            "message": "Letter to Santa received successfully!"
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        app.logger.exception("Failed processing Santa order")
        return jsonify({'error': str(e)}), 500


def get_toy_price(toy_id):
    """Helper to get toy price - in real app, fetch from database"""
    toys_data = get_toys_by_category('all')
    for toy in toys_data:
        if toy['id'] == toy_id:
            return toy['price']
    return 0


@app.route('/product/<int:product_id>')
def product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    return render_template('product.html', product=product)


# Existing API Routes (preserved for backward compatibility)
@app.route('/api/products', methods=['GET'])
def get_products():
    """
    Returns list of products. Each product should include at least:
    id, name, price, description, images_url_list (as list)
    Supports language parameter: ?lang=en|hy|ru
    """
    language = request.args.get('lang', 'en')
    if language not in ['en', 'hy', 'ru']:
        language = 'en'
    
    products = Product.query.order_by(Product.id).all()
    if not products:
        # Return an empty list (front-end may show placeholders) or a small seed.
        return jsonify([])

    return jsonify([product.to_dict(language) for product in products])


@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    language = request.args.get('lang', 'en')
    if language not in ['en', 'hy', 'ru']:
        language = 'en'
    
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict(language))



@app.route('/api/products/seed', methods=['GET'])
@login_required
def seed_products():
    try:
        with open("seed_data.json", "r") as file:
            sample = json.load(file)  # remove [0], sample is now a list of products

        print(sample)
        created = []
        for p in sample:
            product = Product(
                name=p['name'],
                price=float(p['price']),
                description=p.get('description', ''),
                images_url_list=json.dumps(p.get('images_url_list', p.get('images', []))),
                category=p.get('category', '')
            )
            db.session.add(product)
            created.append(product)

        db.session.commit()
        return jsonify({
            "message": "Seeded demo products",
            "created": [p.to_dict() for p in created]
        }), 201

    except Exception as e:
        db.session.rollback()
        print({"error": str(e)})
        return jsonify({"error": str(e)}), 500


@app.route('/api/contact', methods=['POST'])
def contact_message():
    """
    Simple contact endpoint - useful for 'send message' from front-end.
    Expects JSON: { name, email, phone?, message }
    Will validate and try to forward message to ADMIN_NOTIFICATION_EMAIL or log it.
    """
    try:
        data = request.get_json() or {}
        name = (data.get('name') or "").strip()
        email = (data.get('email') or "").strip()
        message = (data.get('message') or "").strip()
        phone = (data.get('phone') or "").strip()

        if not name:
            return jsonify({'error': 'Name is required'}), 400
        if not email or not re.match(EMAIL_REGEX, email):
            return jsonify({'error': 'Valid email is required'}), 400
        if not message:
            return jsonify({'error': 'Message is required'}), 400

        # Build admin notification body
        body = f"New contact message from {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}\n\nTime: {datetime.utcnow().isoformat()}Z"

        # Try to deliver to admin email if configured
        delivered = False
        if ADMIN_NOTIFICATION_EMAIL:
            delivered = send_email(ADMIN_NOTIFICATION_EMAIL, f"Contact message from {name}", body)

        # Also log
        app.logger.info("Contact message received: " + body)

        return jsonify({'message': 'Message received', 'delivered_to_admin': bool(delivered)}), 200
    except Exception as e:
        app.logger.exception("Contact endpoint failed")
        return jsonify({'error': str(e)}), 500


@app.route('/api/orders', methods=['POST'])
def create_order():
    """
    Create an order (used by the front-end 'Send to Santa' button).
    Expects JSON like:
    {
      "customer_name": "Alice",
      "phone": "...",
      "email": "...",
      "comment": "...",
      "items": [
        { "productId": 1, "qty": 2, "name": "Teddy Bear", "price": 24.99 },
        ...
      ]
    }
    Returns created order (shallow) and attempts to send a confirmation email if SMTP configured.
    """
    try:
        data = request.get_json() or {}

        # Basic validation
        customer_name = (data.get('customer_name') or "").strip()
        phone = (data.get('phone') or "").strip()
        email = (data.get('email') or "").strip()
        items = data.get('items') or []
        comment = (data.get('comment') or "").strip()

        if not customer_name:
            return jsonify({'error': 'Customer name is required'}), 400
        if not phone:
            return jsonify({'error': 'Phone number is required'}), 400
        if not email or not re.match(EMAIL_REGEX, email):
            return jsonify({'error': 'Valid email is required'}), 400
        if not items or len(items) == 0:
            return jsonify({'error': 'Order must contain at least one item'}), 400

        # Persist order
        order = Order(
            customer_name=customer_name,
            phone=phone,
            email=email,
            comment=comment,
            items=json.dumps(items),
            created_at=datetime.utcnow()
        )
        db.session.add(order)
        db.session.commit()

        # Build email text
        total = sum([(float(it.get('price', 0)) * int(it.get('qty', 1))) for it in items])
        items_text = "\n".join([f"- {it.get('name')} x{int(it.get('qty',1))} @ ${float(it.get('price',0)):.2f}" for it in items])
        subject_user = "Your Santa Order Confirmation"
        body_user = (
            f"Hi {customer_name},\n\n"
            f"Thanks for your order! Santa's elves received your request.\n\n"
            f"Order summary:\n{items_text}\n\nTotal: ${total:.2f}\n\n"
            f"We will contact you at {phone} or {email} if needed.\n\n"
            "Happy holidays!\nSanta's Workshop\n"
        )

        # Send confirmation to customer (best-effort)
        send_email_success = send_email(email, subject_user, body_user)

        # Notify admin if email configured
        if ADMIN_NOTIFICATION_EMAIL:
            subject_admin = f"New Order #{order.id} from {customer_name}"
            body_admin = (
                f"Order ID: {order.id}\nCustomer: {customer_name}\nEmail: {email}\nPhone: {phone}\n\n"
                f"Items:\n{items_text}\n\nTotal: ${total:.2f}\n\nComment: {comment}\nCreated at: {order.created_at.isoformat()}Z"
            )
            send_email(ADMIN_NOTIFICATION_EMAIL, subject_admin, body_admin)

        response = {
            'message': 'Order created successfully',
            'order_id': order.id,
            'delivered_confirmation_email': bool(send_email_success)
        }
        return jsonify(response), 201

    except Exception as e:
        db.session.rollback()
        app.logger.exception("Failed creating order")
        return jsonify({'error': str(e)}), 500


# Admin Routes (login/logout/dashboard) - unchanged, but kept here for completeness
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        admin = verify_admin(username, password)
        if admin:
            login_user(admin)
            return redirect(url_for('admin_dashboard'))

        return render_template('admin/login.html', error='Invalid credentials')

    return render_template('admin/login.html')


@app.route('/admin/logout')
@login_required
def admin_logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    return render_template('admin/dashboard.html')


@app.route('/admin/orders')
@login_required
def admin_orders():
    return render_template('admin/orders.html')


# Admin API Routes (create/update/delete) - preserved but slightly hardened
@app.route('/api/admin/products', methods=['POST'])
@login_required
def admin_create_product():
    try:
        data = request.get_json() or {}

        if not data.get('name'):
            return jsonify({'error': 'Product name is required'}), 400
        if 'price' not in data:
            return jsonify({'error': 'Price is required'}), 400
        price = float(data['price'])
        if price <= 0:
            return jsonify({'error': 'Valid positive price is required'}), 400
        images = data.get('images_url_list') or []
        if not images or len(images) == 0:
            return jsonify({'error': 'At least one image URL is required'}), 400

        product = Product(
            name=data['name'],
            price=price,
            description=data.get('description', ''),
            images_url_list=json.dumps(images),
            category=data.get('category', '')
        )
        db.session.add(product)
        db.session.commit()

        return jsonify({'message': 'Product created successfully', 'product': product.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/products/<int:product_id>', methods=['PUT'])
@login_required
def admin_update_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json() or {}

        if 'name' in data:
            product.name = data['name']
        if 'price' in data:
            price = float(data['price'])
            if price <= 0:
                return jsonify({'error': 'Price must be positive'}), 400
            product.price = price
        if 'description' in data:
            product.description = data['description']
        if 'images_url_list' in data:
            if not data['images_url_list']:
                return jsonify({'error': 'At least one image URL is required'}), 400
            product.images_url_list = json.dumps(data['images_url_list'])
        if 'category' in data:
            product.category = data['category']

        db.session.commit()
        return jsonify({'message': 'Product updated successfully', 'product': product.to_dict()})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/products/<int:product_id>', methods=['DELETE'])
@login_required
def admin_delete_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/admin/orders', methods=['GET'])
@login_required
def admin_get_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders])


@app.route('/api/admin/orders/<int:order_id>', methods=['GET'])
@login_required
def admin_get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict())


@app.route('/api/admin/orders/<int:order_id>/status', methods=['PUT'])
@login_required
def admin_update_order_status(order_id):
    try:
        order = Order.query.get_or_404(order_id)
        data = request.get_json() or {}
        status = data.get('status', '')
        if status in ['new', 'processed', 'shipped']:
            order.status = status
            db.session.commit()
            return jsonify({'message': 'Order status updated successfully', 'order': order.to_dict()})
        else:
            return jsonify({'error': 'Invalid status'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Initialize DB + admin for development convenience
def _init_for_dev():
    with app.app_context():
        if os.getenv('FLASK_ENV') == 'development':
            db.create_all()
            init_admin_user()

prefix_routes(app, '/mandarin')

if __name__ == '__main__':
    _init_for_dev()
    # Run the app
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5001)), debug=(os.getenv('FLASK_ENV') == 'development'))