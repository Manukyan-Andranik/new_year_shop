import os
import json
import uuid
import re
import smtplib
import ssl
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from flask_migrate import Migrate
from sqlalchemy import event
from sqlalchemy.exc import IntegrityError
from werkzeug.middleware.dispatcher import DispatcherMiddleware

from sqlalchemy.engine import Engine

# Local imports
from models import db, Product, Order, ProductType, ProductTypesSamples
from admin_auth import login_manager, init_admin_user, verify_admin
from data.toys import get_toys_by_category

load_dotenv()

# ===============================
# App setup
# ===============================
app = Flask(__name__, template_folder="templates", static_folder="static")

SCHEMA_NAME = 'newyear_shop_schema'
BASE_URL = os.getenv("BASE_URL", "/mandarin")

# ===============================
# Database Configuration
# ===============================
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'postgres')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'christmas_shop')

# Email Config
EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

SMTP_HOST = os.getenv('SMTP_HOST')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587')) if os.getenv('SMTP_PORT') else None
SMTP_USER = os.getenv('SMTP_USER')
SMTP_PASS = os.getenv('SMTP_PASS')
EMAIL_FROM = os.getenv('EMAIL_FROM', SMTP_USER or f'no-reply@{os.getenv("MAIL_DOMAIN","localhost")}')
ADMIN_NOTIFICATION_EMAIL = os.getenv('ADMIN_NOTIFICATION_EMAIL')

BASE_PREFIX = os.getenv("BASE_PREFIX", "https://logiclab.am/mandarin/")

# App Config
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'christmas-shop-secret-key-2023')
app.config['SQLALCHEMY_DATABASE_URI'] = (os.getenv('SQLALCHEMY_DATABASE_URI') or f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}") 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
login_manager.init_app(app)
login_manager.login_view = 'admin_login'

# ===============================
# Email Utility
# ===============================
def send_email(to_address: str, subject: str, body: str):
    """
    Send a simple plain-text email using SMTP details from env.
    If SMTP is not configured, print to console instead.
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
        app.logger.info("SMTP not configured — email output below:\n" + "-" * 40 +
                        f"\nTo: {to_address}\nSubject: {subject}\n\n{body}\n" + "-" * 40)
        return False


# ===============================
# CORS + Schema setup
# ===============================
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

`
@event.listens_for(Engine, "connect")
def set_search_path(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute(f"SET search_path TO {SCHEMA_NAME};")
    cursor.close()
`

# ===============================
# Routes
# ===============================
@app.route("/", methods=["GET"])
def home():
    print("Rendering product types page")
    items = ProductTypesSamples().get_all()

    return render_template(
        "home.html",
        PRODUCT_TYPES=[p for p in items],
        SHOP_URL="/shop",
        API_LIST=f"{BASE_URL}/api/product-types",
        API_ADD=f"{BASE_URL}/api/product-types",
        IMAGE_PREFIX=f"{BASE_URL}/static/",
        BASE_PREFIX=BASE_PREFIX
    )

@app.route('/about')
def about():
    return render_template('about.html') 

@app.route('/shop', methods=['GET'])
def shop():
    product_type = request.args.get('type', 'all')
    if product_type:
        product_type = product_type.replace('-', '_').lower()
    else:
        product_type = 'all'
    print(f"Rendering shop page for type: {product_type}")
    return render_template('shop.html', product_type=product_type, BASE_PREFIX=BASE_PREFIX)


@app.route("/api/product-types", methods=["GET"])
def api_list_product_types():
    items = ProductTypesSamples().get_all()
    return jsonify([p for p in items])


@app.route('/api/products', methods=['GET'])
def get_products():
    products_type = request.args.get('type', 'all')
    if products_type:
        products_type = products_type.replace('-', '_').lower()
    else:
        products_type = 'all'

    language = request.args.get('lang', 'en')
    if language not in ['en', 'hy', 'ru']:
        language = 'en'

    print(f"[API] GET /api/products - type: {products_type}, lang: {language}")

    query = Product.query.order_by(Product.id)
    if products_type != 'all':
        query = query.filter(Product.type == products_type)

    products = query.all()
    print(f"[API] Products fetched for type '{products_type}': {len(products)} items")
    
    if not products:
        return jsonify([])

    result = [product.to_dict(language) for product in products]
    return jsonify(result)

# ===============================
# Santa Message Order
# ===============================
@app.route('/order', methods=['POST'])
def create_santa_order():
    try:
        data = request.get_json() or {}
        customer = data.get('customer', {})
        customer_name = customer.get('name', '').strip()
        email = customer.get('email', '').strip()
        message = data.get('message', '').strip()
        items = data.get('items', [])

        if not customer_name:
            return jsonify({'error': 'Customer name is required'}), 400
        if not message:
            return jsonify({'error': 'Message to Santa is required'}), 400
        if not items:
            return jsonify({'error': 'Order must contain at least one item'}), 400
        if email and not re.match(EMAIL_REGEX, email):
            return jsonify({'error': 'Valid email is required if provided'}), 400

        order_id = str(uuid.uuid4())
        total = sum([get_toy_price(item['id']) * item['qty'] for item in items])

        if email:
            subject = "🎅 Your Letter to Santa Has Been Received!"
            body = (
                f"Dear {customer_name},\n\n"
                f"Thank you for your letter to Santa!\n"
                f"Your order reference: {order_id}\nTotal items: {len(items)}\n"
                f"Estimated value:  ֏{total:.2f}\n\nMerry Christmas!\nSanta's Workshop"
            )
            send_email(email, subject, body)

        return jsonify({
            "status": "ok",
            "order_id": order_id,
            "message": "Letter to Santa received successfully!"
        }), 200

    except Exception as e:
        app.logger.exception("Failed processing Santa order")
        return jsonify({'error': str(e)}), 500


def get_toy_price(toy_id):
    toys_data = get_toys_by_category('all')
    for toy in toys_data:
        if toy['id'] == toy_id:
            return toy['price']
    return 0

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    product = Product.query.get_or_404(product_id)
    return render_template('product.html', product=product)

# ===============================
# API Routes
# ===============================
def prefix_image_urls(product_data):
    """Prefix relative image URLs with site domain"""
    
    images = product_data.get("images_url_list", [])
    product_data["images_url_list"] = [
        img if img.startswith("http") else BASE_PREFIX + img.lstrip('/')
        for img in images
    ]
    return product_data

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    language = request.args.get('lang', 'en')
    if language not in ['en', 'hy', 'ru']:
        language = 'en'
    product = Product.query.get_or_404(product_id)
    return jsonify(prefix_image_urls(product.to_dict(language)))


# ===============================
# Contact Endpoint
# ===============================
@app.route('/api/contact', methods=['POST'])
def contact_message():
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

        body = (
            f"New contact message from {name}\nEmail: {email}\nPhone: {phone}\n\n"
            f"Message:\n{message}\n\nTime: {datetime.utcnow().isoformat()}Z"
        )

        delivered = False
        if ADMIN_NOTIFICATION_EMAIL:
            delivered = send_email(ADMIN_NOTIFICATION_EMAIL, f"Contact message from {name}", body)

        app.logger.info("Contact message received: " + body)
        return jsonify({'message': 'Message received', 'delivered_to_admin': bool(delivered)}), 200
    except Exception as e:
        app.logger.exception("Contact endpoint failed")
        return jsonify({'error': str(e)}), 500


# ===============================
# Order Creation
# ===============================
@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json() or {}
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
        if not items:
            return jsonify({'error': 'Order must contain at least one item'}), 400

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

        total = sum([(float(it.get('price', 0)) * int(it.get('qty', 1))) for it in items])
        items_text = "\n".join([f"- {it.get('name')} x{int(it.get('qty',1))} @  ֏{float(it.get('price',0)):.2f}" for it in items])

        subject_user = "Your Santa Order Confirmation"
        body_user = (
            f"Hi {customer_name},\n\nThanks for your order!\n\nOrder summary:\n{items_text}\n\n"
            f"Total:  ֏{total:.2f}\n\nWe will contact you at {phone} or {email} if needed.\n\n"
            "Happy holidays!\nSanta's Workshop\n"
        )

        send_email_success = send_email(email, subject_user, body_user)

        if ADMIN_NOTIFICATION_EMAIL:
            subject_admin = f"New Order #{order.id} from {customer_name}"
            body_admin = (
                f"Order ID: {order.id}\nCustomer: {customer_name}\nEmail: {email}\nPhone: {phone}\n\n"
                f"Items:\n{items_text}\n\nTotal:  ֏{total:.2f}\n\nComment: {comment}\nCreated at: {order.created_at.isoformat()}Z"
            )
            send_email(ADMIN_NOTIFICATION_EMAIL, subject_admin, body_admin)

        return jsonify({
            'message': 'Order created successfully',
            'order_id': order.id,
            'delivered_confirmation_email': bool(send_email_success)
        }), 201

    except Exception as e:
        db.session.rollback()
        app.logger.exception("Failed creating order")
        return jsonify({'error': str(e)}), 500


# ===============================
# Admin Routes
# ===============================
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
    return redirect(url_for('home'))


@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    return render_template('admin/dashboard.html')


@app.route('/admin/orders')
@login_required
def admin_orders():
    return render_template('admin/orders.html', BASE_PREFIX=BASE_PREFIX)


@app.route('/api/admin/orders', methods=['GET'])
@login_required
def get_orders():
    query = Order.query.order_by(Order.created_at.desc())
    orders = query.all()
    
    if not orders:
        return jsonify([])

    result = [order.to_dict() for order in orders]
    print(result[0])
    return jsonify(result)


@app.route('/.well-known/appspecific/com.chrome.devtools.json')
def ignore_devtools_probe():
    return '', 204  # 204 = No Content


# ===============================
# Development Init
# ===============================
def _init_for_dev():
    with app.app_context():
        db.create_all()
        init_admin_user()

if __name__ == '__main__':
    _init_for_dev()
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5002)), debug=(os.getenv('FLASK_ENV') == 'development'))