from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from models import AdminUser, db
import os

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return AdminUser.query.get(int(user_id))

def init_admin_user():
    if not AdminUser.query.filter_by(username='admin').first():
        admin = AdminUser(
            username='admin',
            password_hash=generate_password_hash(os.getenv('ADMIN_PASSWORD', 'christmas2023'))
        )
        db.session.add(admin)
        db.session.commit()

def verify_admin(username, password):
    admin = AdminUser.query.filter_by(username=username).first()
    if admin and check_password_hash(admin.password_hash, password):
        return admin
    return None