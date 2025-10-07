# import os

# # Define the project structure
# structure = {
#     "templates": [
#         "index.html"
#     ],
#     "static/css": [
#         "style.css"
#     ],
#     "static/data": [
#         "products.json"
#     ],
#     "static/js": [
#         "scene.js",
#         "ui.js",
#         "api.js",
#         "main.js"
#     ]
# }

# def create_project_structure(base_path="."):
#     for folder, files in structure.items():
#         # Create directories
#         dir_path = os.path.join(base_path, folder)
#         os.makedirs(dir_path, exist_ok=True)
#         print(f"📁 Created directory: {dir_path}")

#         # Create files
#         for file_name in files:
#             file_path = os.path.join(dir_path, file_name)
#             if not os.path.exists(file_path):
#                 with open(file_path, "w", encoding="utf-8") as f:
#                     # Add basic template text based on file type
#                     if file_name.endswith(".html"):
#                         f.write("<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <title>Christmas Shop</title>\n</head>\n<body>\n</body>\n</html>")
#                     elif file_name.endswith(".css"):
#                         f.write("/* Main Stylesheet */\nbody {\n  margin: 0;\n  font-family: Arial, sans-serif;\n}")
#                     elif file_name.endswith(".json"):
#                         f.write("{\n  \"products\": []\n}")
#                     elif file_name.endswith(".js"):
#                         f.write("// " + file_name + " logic here\n")
#                 print(f"📝 Created file: {file_path}")
#             else:
#                 print(f"⚠️ File already exists: {file_path}")

# if __name__ == "__main__":
#     create_project_structure()



import json
from datetime import datetime, timezone
from unicodedata import category
from models import db, Product
from app import app  # your Flask app

# Your product data
products_data = [
    {
        "id": 1,
        "name": "Teddy Bear",
        "price": 24.99,
        "image": "http://127.0.0.1:5001/static/images/dino.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/dino.png",
            "http://127.0.0.1:5001/static/images/exo.png"
        ],
        "color": 9109507,
        "description": "A cuddly teddy bear with soft fur. Perfect for bedtime hugs and festive snuggles.",
        "details": { "Age": "3+", "Material": "Plush", "Size": "30cm" }
    },
    {
        "id": 2,
        "name": "Wooden Train",
        "price": 34.99,
        "image": "http://127.0.0.1:5001/static/images/dino.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/dino.png",
            "http://127.0.0.1:5001/static/images/exo.png"
        ],
        "color": 12938444,
        "description": "Classic wooden train set with smooth edges and bright paint. Encourages imaginative play.",
        "details": { "Age": "4+", "Material": "Wood", "Pieces": "6" }
    },
    {
        "id": 3,
        "name": "Snowman",
        "price": 19.99,
        "image": "http://127.0.0.1:5001/static/images/exo.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/exo.png",
            "http://127.0.0.1:5001/static/images/dino.png"
        ],
        "color": 16777215,
        "description": "A jolly snowman figure with carrot nose and hat. Adds winter charm to any shelf.",
        "details": { "Age": "2+", "Material": "Resin", "Height": "12cm" }
    },
    {
        "id": 4,
        "name": "Rocket Ship",
        "price": 29.99,
        "image": "http://127.0.0.1:5001/static/images/noro.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/noro.png",
            "http://127.0.0.1:5001/static/images/exo.png"
        ],
        "color": 6310470,
        "description": "Launch into space with this colorful rocket. Durable and perfect for adventure play.",
        "details": { "Age": "5+", "Material": "Plastic", "Battery": "No" }
    },
    {
        "id": 5,
        "name": "Doll",
        "price": 27.99,
        "image": "http://127.0.0.1:5001/static/images/dino.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/dino.png",
            "http://127.0.0.1:5001/static/images/exo.png"
        ],
        "color": 16734003,
        "description": "A sweet doll with moveable limbs and a smiling face. Comes with a tiny outfit.",
        "details": { "Age": "3+", "Material": "Cloth/Plastic", "Includes outfit": "Yes" }
    },
    {
        "id": 6,
        "name": "Drum",
        "price": 22.99,
        "image": "http://127.0.0.1:5001/static/images/noro.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/noro.png",
            "http://127.0.0.1:5001/static/images/exo.png"
        ],
        "color": 13938487,
        "description": "A bright drum for little musicians. Lightweight and easy to hold.",
        "details": { "Age": "2+", "Material": "Metal/Plastic", "Diameter": "12cm" }
    },
    {
        "id": 7,
        "name": "Spinning Top",
        "price": 15.99,
        "image": "http://127.0.0.1:5001/static/images/noro.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/noro.png",
            "http://127.0.0.1:5001/static/images/exo.png"
        ],
        "color": 4613732,
        "description": "A classic spinning top that blooms with colors while spinning.",
        "details": { "Age": "3+", "Material": "Wood/Plastic", "Made in": "Toyland" }
    },
    {
        "id": 8,
        "name": "Reindeer",
        "price": 32.99,
        "image": "http://127.0.0.1:5001/static/images/dino.png",
        "images_url_list": [
            "http://127.0.0.1:5001/static/images/dino.png",
            "http://127.0.0.1:5001/static/images/exo.png"
        ],
        "color": 14821860,
        "description": "A festive reindeer figurine fit for the mantle. Hand-painted details.",
        "details": { "Age": "6+", "Material": "Resin", "Height": "14cm" }
    }
]
import random
categoryes = ["small", "big", "for_business"]

# Insert data into database
with app.app_context():
    for item in products_data:
        product = Product(
            id=item['id'],
            name=item['name'],
            price=item['price'],
            description=item['description'],
            images_url_list=json.dumps(item['images_url_list']),  # serialize list
            category=random.choice(categoryes),  # assign random category
            is_active=True,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        db.session.add(product)

    db.session.commit()
    print(f"Inserted {len(products_data)} products into the database.")
