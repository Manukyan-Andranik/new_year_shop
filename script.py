# import json
# from datetime import datetime, timezone
# from unicodedata import category
# from models import db, Product
# from app import app  # your Flask app

# # Your product data
# products_data = [
#     {
#         "id": 1,
#         "name": "Teddy Bear",
#         "price": 24.99,
#         "image": "http://127.0.0.1:5001/static/images/dino.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/dino.png",
#             "http://127.0.0.1:5001/static/images/exo.png"
#         ],
#         "color": 9109507,
#         "description": "A cuddly teddy bear with soft fur. Perfect for bedtime hugs and festive snuggles.",
#         "details": { "Age": "3+", "Material": "Plush", "Size": "30cm" }
#     },
#     {
#         "id": 2,
#         "name": "Wooden Train",
#         "price": 34.99,
#         "image": "http://127.0.0.1:5001/static/images/dino.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/dino.png",
#             "http://127.0.0.1:5001/static/images/exo.png"
#         ],
#         "color": 12938444,
#         "description": "Classic wooden train set with smooth edges and bright paint. Encourages imaginative play.",
#         "details": { "Age": "4+", "Material": "Wood", "Pieces": "6" }
#     },
#     {
#         "id": 3,
#         "name": "Snowman",
#         "price": 19.99,
#         "image": "http://127.0.0.1:5001/static/images/exo.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/exo.png",
#             "http://127.0.0.1:5001/static/images/dino.png"
#         ],
#         "color": 16777215,
#         "description": "A jolly snowman figure with carrot nose and hat. Adds winter charm to any shelf.",
#         "details": { "Age": "2+", "Material": "Resin", "Height": "12cm" }
#     },
#     {
#         "id": 4,
#         "name": "Rocket Ship",
#         "price": 29.99,
#         "image": "http://127.0.0.1:5001/static/images/noro.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/noro.png",
#             "http://127.0.0.1:5001/static/images/exo.png"
#         ],
#         "color": 6310470,
#         "description": "Launch into space with this colorful rocket. Durable and perfect for adventure play.",
#         "details": { "Age": "5+", "Material": "Plastic", "Battery": "No" }
#     },
#     {
#         "id": 5,
#         "name": "Doll",
#         "price": 27.99,
#         "image": "http://127.0.0.1:5001/static/images/dino.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/dino.png",
#             "http://127.0.0.1:5001/static/images/exo.png"
#         ],
#         "color": 16734003,
#         "description": "A sweet doll with moveable limbs and a smiling face. Comes with a tiny outfit.",
#         "details": { "Age": "3+", "Material": "Cloth/Plastic", "Includes outfit": "Yes" }
#     },
#     {
#         "id": 6,
#         "name": "Drum",
#         "price": 22.99,
#         "image": "http://127.0.0.1:5001/static/images/noro.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/noro.png",
#             "http://127.0.0.1:5001/static/images/exo.png"
#         ],
#         "color": 13938487,
#         "description": "A bright drum for little musicians. Lightweight and easy to hold.",
#         "details": { "Age": "2+", "Material": "Metal/Plastic", "Diameter": "12cm" }
#     },
#     {
#         "id": 7,
#         "name": "Spinning Top",
#         "price": 15.99,
#         "image": "http://127.0.0.1:5001/static/images/noro.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/noro.png",
#             "http://127.0.0.1:5001/static/images/exo.png"
#         ],
#         "color": 4613732,
#         "description": "A classic spinning top that blooms with colors while spinning.",
#         "details": { "Age": "3+", "Material": "Wood/Plastic", "Made in": "Toyland" }
#     },
#     {
#         "id": 8,
#         "name": "Reindeer",
#         "price": 32.99,
#         "image": "http://127.0.0.1:5001/static/images/dino.png",
#         "images_url_list": [
#             "http://127.0.0.1:5001/static/images/dino.png",
#             "http://127.0.0.1:5001/static/images/exo.png"
#         ],
#         "color": 14821860,
#         "description": "A festive reindeer figurine fit for the mantle. Hand-painted details.",
#         "details": { "Age": "6+", "Material": "Resin", "Height": "14cm" }
#     }
# ]
# import random
# categoryes = ["small", "big", "for_business"]

# # Insert data into database
# with app.app_context():
#     for item in products_data:
#         product = Product(
#             id=item['id'],
#             name=item['name'],
#             price=item['price'],
#             description=item['description'],
#             images_url_list=json.dumps(item['images_url_list']),  # serialize list
#             category=random.choice(categoryes),  # assign random category
#             is_active=True,
#             created_at=datetime.now(timezone.utc),
#             updated_at=datetime.now(timezone.utc)
#         )
#         db.session.add(product)

#     db.session.commit()
#     print(f"Inserted {len(products_data)} products into the database.")





# insert_sample_product_types.py
"""
This script inserts sample 'ProductType' records into the database.

Usage:
    python insert_sample_product_types.py
"""

import os
from datetime import datetime
from sqlalchemy.exc import IntegrityError

from app import db, ProductType, app

import os
from datetime import datetime
from app import db, ProductType, app, Product
import json
from datetime import timezone

# ---- Sample data with translations ----
sample_product_types = [
    {
        "type": "teacher",
        "title_hy": "Ձեր սիրելի դպրոցի/մանկապարտեզի ուսուցիչների համար",
        "title_en": "For your favorite school/kindergarten teachers",
        "title_ru": "Для ваших любимых учителей школы/детского сада",
        "description_hy": "Տոնական փայտե զարդեր՝ ուսուցիչների և դաստիարակների համար։",
        "description_en": "Festive wooden ornaments for teachers and educators.",
        "description_ru": "Праздничные деревянные украшения для учителей и воспитателей.",
        "image_url": "images/teacher-ornament.jpg",
    },
    {
        "type": "staff",
        "title_hy": "Սիրելի աշխատակիցների համար",
        "title_en": "For beloved staff members",
        "title_ru": "Для любимых сотрудников",
        "description_hy": "Փայտե տոնական նվերներ՝ գործընկերների համար։",
        "description_en": "Wooden holiday gifts for colleagues.",
        "description_ru": "Деревянные праздничные подарки для коллег.",
        "image_url": "images/office-ornament.jpg",
    },
    {
        "type": "love",
        "title_hy": "Սիրելիս համար",
        "title_en": "For your loved one",
        "title_ru": "Для любимого человека",
        "description_hy": "Հուշարժեք փայտե խաղալիքներ՝ սիրելիի համար։",
        "description_en": "Memorable wooden toys for your loved one.",
        "description_ru": "Деревянные сувениры для любимого человека.",
        "image_url": "images/love-ornament.jpg",
    },
    {
        "type": "friend",
        "title_hy": "Ընկերոջ համար",
        "title_en": "For a friend",
        "title_ru": "Для друга",
        "description_hy": "Բնավորությամբ լի զարդեր՝ ձեր լավ ընկերոջ համար։",
        "description_en": "Personality-filled ornaments for your friend.",
        "description_ru": "Украшения, полные характера, для вашего друга.",
        "image_url": "images/friend-ornament.jpg",
    },
    {
        "type": "family",
        "title_hy": "Ընտանիքի համար",
        "title_en": "For the family",
        "title_ru": "Для семьи",
        "description_hy": "Փայտե խաղալիքների հավաքածու՝ ընտանեկան հիշողությունների համար։",
        "description_en": "Wooden toy sets for family memories.",
        "description_ru": "Наборы деревянных игрушек для семейных воспоминаний.",
        "image_url": "images/family-ornament.jpg",
    },
    {
        "type": "corporate",
        "title_hy": "Կորպորատիվի համար",
        "title_en": "For corporate clients",
        "title_ru": "Для корпоративных клиентов",
        "description_hy": "Բրենդավորմամբ զարդեր՝ ձեր թիմի և գործընկերների համար։",
        "description_en": "Branded ornaments for your team and partners.",
        "description_ru": "Брендированные украшения для вашей команды и партнеров.",
        "image_url": "images/corporate-ornament.jpg",
    },
    {
        "type": "custom",
        "title_hy": "Այլ",
        "title_en": "Custom / Other",
        "title_ru": "Другие / По заказу",
        "description_hy": "Հատուկ պատվերներ՝ ցանկացած առիթի համար։",
        "description_en": "Special orders for any occasion.",
        "description_ru": "Специальные заказы для любого случая.",
        "image_url": "images/custom-ornament.jpg",
    },
]

def seed_sample_product_types(image_prefix: str = None, commit: bool = True) -> int:
    """
    Inserts missing product types or updates existing ones.
    Sets main `title` and `description` to Armenian by default (fallback to English/Russian).
    """
    inserted = 0
    for item in sample_product_types:
        t = item["type"]
        existing = ProductType.query.filter_by(type=t).first()

        # Prepare image URL with optional prefix
        img = item.get("image_url")
        if img and image_prefix and not img.lower().startswith("http"):
            if image_prefix.endswith("/") and img.startswith("/"):
                img = image_prefix[:-1] + img
            elif not image_prefix.endswith("/") and not img.startswith("/"):
                img = image_prefix + "/" + img
            else:
                img = image_prefix + img

        if existing:
            # Update translations
            existing.title_hy = item.get("title_hy", existing.title_hy)
            existing.title_en = item.get("title_en", existing.title_en)
            existing.title_ru = item.get("title_ru", existing.title_ru)
            existing.description_hy = item.get("description_hy", existing.description_hy)
            existing.description_en = item.get("description_en", existing.description_en)
            existing.description_ru = item.get("description_ru", existing.description_ru)
            # Update main fields to prevent nulls
            existing.title = existing.title_hy or existing.title_en or existing.title_ru
            existing.description = existing.description_hy or existing.description_en or existing.description_ru
            if img:
                existing.image_url = img
            continue

        # Create new ProductType
        pt = ProductType(
            type=t,
            title=item.get("title_hy") or item.get("title_en") or item.get("title_ru"),
            description=item.get("description_hy") or item.get("description_en") or item.get("description_ru"),
            title_hy=item.get("title_hy"),
            title_en=item.get("title_en"),
            title_ru=item.get("title_ru"),
            description_hy=item.get("description_hy"),
            description_en=item.get("description_en"),
            description_ru=item.get("description_ru"),
            image_url=img,
        )
        db.session.add(pt)
        inserted += 1

    if inserted > 0 and commit:
        db.session.commit()
    return inserted

# Sample products data
sample_products = [
    {
        "id": 1,
        "name_en": "Teddy Bear",
        "name_hy": "Տեդի արջուկ",
        "name_ru": "Плюшевый мишка",
        "description_en": "A cuddly teddy bear with soft fur. Perfect for bedtime hugs and festive snuggles.",
        "description_hy": "Փափուկ տեդի արջուկ՝ քնքուշ բրդով։ Հարմար է գիշերային գրկախառնությունների և տոնական պահերի համար։",
        "description_ru": "Мягкий плюшевый мишка с нежным мехом. Идеален для объятий перед сном и праздничных вечеров.",
        "price": 24.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/dino.png",
            "https://logiclab.am/mandarin/static/images/exo.png"
        ],
        "category": "Toys",
        "type": "love",
        "is_active": True
    },
    {
        "id": 2,
        "name_en": "Wooden Train",
        "name_hy": "Փայտե գնացք",
        "name_ru": "Деревянный поезд",
        "description_en": "Classic wooden train set with smooth edges and bright paint. Encourages imaginative play.",
        "description_hy": "Դասական փայտե գնացք՝ հարթ եզրերով և վառ գույներով։ Զարգացնում է երևակայությունը։",
        "description_ru": "Классический деревянный поезд с гладкими краями и яркой раскраской. Стимулирует воображение.",
        "price": 34.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/dino.png",
            "https://logiclab.am/mandarin/static/images/exo.png"
        ],
        "category": "big",
        "type": "family",
        "is_active": True
    },
    {
        "id": 3,
        "name_en": "Snowman",
        "name_hy": "Ձնեմարդ",
        "name_ru": "Снеговик",
        "description_en": "A jolly snowman figure with carrot nose and hat. Adds winter charm to any shelf.",
        "description_hy": "Ցնծալի ձնեմարդ՝ գազարի քթով և գլխարկով։ Ավելացնում է ձմեռային հմայք ցանկացած դարակին։",
        "description_ru": "Весёлый снеговик с морковным носом и шляпой. Добавляет зимнее очарование любой полке.",
        "price": 19.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/exo.png",
            "https://logiclab.am/mandarin/static/images/dino.png"
        ],
        "category": "big",
        "type": "family",
        "is_active": True
    },
    {
        "id": 4,
        "name_en": "Rocket Ship",
        "name_hy": "Ռակետային նավ",
        "name_ru": "Ракета",
        "description_en": "Launch into space with this colorful rocket. Durable and perfect for adventure play.",
        "description_hy": "Թռիչք կատարիր տիեզերք այս գունավոր ռակետով։ Դիմացկուն է և հարմար արկածային խաղերի համար։",
        "description_ru": "Отправляйся в космос с этой красочной ракетой. Прочная и отличная для приключений.",
        "price": 29.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/noro.png",
            "https://logiclab.am/mandarin/static/images/exo.png"
        ],
        "category": "smal",
        "type": "teacher",
        "is_active": True
    },
    {
        "id": 5,
        "name_en": "Doll",
        "name_hy": "Տիկնիկ",
        "name_ru": "Кукла",
        "description_en": "A sweet doll with moveable limbs and a smiling face. Comes with a tiny outfit.",
        "description_hy": "Քնքուշ տիկնիկ շարժվող վերջույթներով և ժպտերես դեմքով։ Ներառում է փոքրիկ հագուստ։",
        "description_ru": "Милая кукла с подвижными конечностями и улыбающимся лицом. В комплекте есть одежда.",
        "price": 27.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/dino.png",
            "https://logiclab.am/mandarin/static/images/exo.png"
        ],
        "category": "for_business",
        "type": "staff",
        "is_active": True
    },
    {
        "id": 6,
        "name_en": "Drum",
        "name_hy": "Թմբուկ",
        "name_ru": "Барабан",
        "description_en": "A bright drum for little musicians. Lightweight and easy to hold.",
        "description_hy": "Փայլուն թմբուկ փոքրիկ երաժիշտների համար։ Թեթև է և հարմար պահելու համար։",
        "description_ru": "Яркий барабан для маленьких музыкантов. Легкий и удобный в использовании.",
        "price": 22.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/noro.png",
            "https://logiclab.am/mandarin/static/images/exo.png"
        ],
        "category": "for_business",
        "type": "friend",
        "is_active": True
    },
    {
        "id": 7,
        "name_en": "Spinning Top",
        "name_hy": "Շրջապտույտ խաղալիք",
        "name_ru": "Юла",
        "description_en": "A classic spinning top that blooms with colors while spinning.",
        "description_hy": "Դասական պտտվող խաղալիք, որը պտտվելիս պայծառ գույներով է փայլում։",
        "description_ru": "Классическая юла, которая сияет яркими красками во время вращения.",
        "price": 15.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/noro.png",
            "https://logiclab.am/mandarin/static/images/exo.png"
        ],
        "category": "big",
        "type": "custom",
        "is_active": True
    },
    {
        "id": 8,
        "name_en": "Reindeer",
        "name_hy": "Յոլկայի եղջերու",
        "name_ru": "Олень",
        "description_en": "A festive reindeer figurine fit for the mantle. Hand-painted details.",
        "description_hy": "Տոնական եղջերու՝ ձեռքով նկարված մանրամասնություններով։ Հիանալի է տոնական զարդարանքի համար։",
        "description_ru": "Праздничный олень с ручной росписью. Отлично подходит для новогоднего декора.",
        "price": 32.99,
        "images_url_list": [
            "https://logiclab.am/mandarin/static/images/dino.png",
            "https://logiclab.am/mandarin/static/images/exo.png"
        ],
        "category": "small",
        "type": "corporate",
        "is_active": True
    }
]

def seed_products(commit=True):
    inserted = 0

    for item in sample_products:
        # Check if product exists
        # existing = Product.query.filter_by(id=item["id"]).first()
        # if existing:
        #     # Update existing product translations
        #     existing.name_hy = item["name_hy"]
        #     existing.name_en = item["name_en"]
        #     existing.name_ru = item["name_ru"]
        #     existing.description_hy = item["description_hy"]
        #     existing.description_en = item["description_en"]
        #     existing.description_ru = item["description_ru"]
        #     existing.price = item["price"]
        #     existing.images_url_list = json.dumps(item["images_url_list"])
        #     existing.category = item["category"]
        #     existing.type = item["type"]
        #     existing.is_active = item["is_active"]
        #     inserted += 1
        #     continue

        # Create new product
        p = Product(
            id=item["id"]+24,
            name=item["name_en"],  # default main name
            name_hy=item["name_hy"],
            name_en=item["name_en"],
            name_ru=item["name_ru"],
            description=item["description_en"],  # default main description
            description_hy=item["description_hy"],
            description_en=item["description_en"],
            description_ru=item["description_ru"],
            price=item["price"],
            images_url_list=json.dumps(item["images_url_list"]),
            category=item["category"],
            type=item["type"],
            is_active=item["is_active"],
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        db.session.add(p)
        inserted += 1

    if commit and inserted > 0:
        db.session.commit()

    return inserted


if __name__ == "__main__":
    with app.app_context():
        # Optional: clear table first
        # Product.query.delete()
        db.session.commit()

        print("Inserted:", seed_products())
