from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime, timezone
import json

db = SQLAlchemy()

class Product(db.Model):
    __tablename__ = 'products'
    __table_args__ = {'schema': 'newyear_shop_schema'}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, index=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.Text)
    images_url_list = db.Column(db.Text)
    category = db.Column(db.String(100), index=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # ✅ Translation fields
    name_en = db.Column(db.String(200))
    name_hy = db.Column(db.String(200))
    name_ru = db.Column(db.String(200))
    description_en = db.Column(db.Text)
    description_hy = db.Column(db.Text)
    description_ru = db.Column(db.Text)

    def __repr__(self):
        return f'<Product {self.name}>'

    def get_translated(self, field_base, lang):
        """Helper: return translated value for given language or fallback to default."""
        field_name = f"{field_base}_{lang}"
        value = getattr(self, field_name, None)
        if value:
            return value
        # fallback to English → original
        return getattr(self, f"{field_base}_en", None) or getattr(self, field_base, "")

    def to_dict(self, lang='en'):
        """Return serialized product with translated fields."""
        return {
            'id': self.id,
            'name': self.get_translated('name', lang),
            'price': float(self.price) if self.price else 0.0,
            'description': self.get_translated('description', lang),
            'images_url_list': json.loads(self.images_url_list) if self.images_url_list else [],
            'category': self.category,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
class Order(db.Model):
    __tablename__ = 'orders'
    __table_args__ = {'schema': 'newyear_shop_schema'}  # <-- corrected schema name

    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(200), nullable=False, index=True)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False, index=True)
    comment = db.Column(db.Text)
    items = db.Column(db.Text)
    status = db.Column(db.String(20), default='new', nullable=False, index=True)
    total_amount = db.Column(db.Numeric(10, 2), default=0.00)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc),
                           onupdate=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<Order {self.id} - {self.customer_name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'phone': self.phone,
            'email': self.email,
            'comment': self.comment,
            'items': json.loads(self.items) if self.items else [],
            'status': self.status,
            'total_amount': float(self.total_amount) if self.total_amount else 0.0,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class AdminUser(UserMixin, db.Model):
    __tablename__ = 'admin_users'
    __table_args__ = {'schema': 'newyear_shop_schema'}  # <-- corrected schema name

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<AdminUser {self.username}>'
