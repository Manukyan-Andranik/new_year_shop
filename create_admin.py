#!/usr/bin/env python3
"""
Script to create admin user for Christmas Shop
Username: admin
Password: admin123
"""

import os
import sys
from werkzeug.security import generate_password_hash

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db
from models import AdminUser

def create_admin_user():
    with app.app_context():
        # Check if admin user already exists
        existing_admin = AdminUser.query.filter_by(username='admin').first()
        
        if existing_admin:
            print("⚠️  Admin user already exists. Updating password...")
            existing_admin.password_hash = generate_password_hash('admin123')
            db.session.commit()
            print("✅ Admin password updated successfully!")
        else:
            # Create new admin user
            admin = AdminUser(
                username='admin',
                password_hash=generate_password_hash('admin123')
            )
            db.session.add(admin)
            db.session.commit()
            print("✅ Admin user created successfully!")
        
        print("\n🔐 Admin Credentials:")
        print("   Username: admin")
        print("   Password: admin123")
        print("\n💡 You can now login at: http://localhost:5000/admin/login")

if __name__ == '__main__':
    try:
        create_admin_user()
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        print("\nMake sure you have:")
        print("1. The database initialized")
        print("2. All required packages installed")
        print("3. The Flask app structure set up correctly")