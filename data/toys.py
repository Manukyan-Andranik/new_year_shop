# data/toys.py
"""
Sample toy data for Christmas shop categories
"""

TOYS_DATA = [
    # Small toys
    {
        "id": 1,
        "name": "Mini Teddy Bear",
        "price": 12.99,
        "image": "/static/images/teddy-small.jpg",
        "description": "A small cuddly teddy bear perfect for stockings",
        "size": "small"
    },
    {
        "id": 2,
        "name": "Christmas Ornament",
        "price": 8.50,
        "image": "/static/images/ornament.jpg",
        "description": "Hand-painted glass Christmas ornament",
        "size": "small"
    },
    {
        "id": 3,
        "name": "Mini Snow Globe",
        "price": 15.99,
        "image": "/static/images/snow-globe-small.jpg",
        "description": "Magical snow globe with Santa scene",
        "size": "small"
    },
    {
        "id": 4,
        "name": "Christmas Cookie Cutters",
        "price": 9.99,
        "image": "/static/images/cookie-cutters.jpg",
        "description": "Set of 6 Christmas-themed cookie cutters",
        "size": "small"
    },
    
    # Big toys
    {
        "id": 5,
        "name": "Deluxe Teddy Bear",
        "price": 34.99,
        "image": "/static/images/teddy-big.jpg",
        "description": "Large premium teddy bear with Santa hat",
        "size": "big"
    },
    {
        "id": 6,
        "name": "Wooden Train Set",
        "price": 59.99,
        "image": "/static/images/train-set.jpg",
        "description": "Complete wooden train set with Christmas theme",
        "size": "big"
    },
    {
        "id": 7,
        "name": "Doll House",
        "price": 79.99,
        "image": "/static/images/doll-house.jpg",
        "description": "Beautiful Victorian-style doll house",
        "size": "big"
    },
    {
        "id": 8,
        "name": "Remote Control Car",
        "price": 45.99,
        "image": "/static/images/rc-car.jpg",
        "description": "Fast remote control car with Christmas wrap",
        "size": "big"
    },
    
    # For Business
    {
        "id": 9,
        "name": "Corporate Gift Basket",
        "price": 149.99,
        "image": "/static/images/gift-basket.jpg",
        "description": "Premium gift basket for corporate clients",
        "size": "business"
    },
    {
        "id": 10,
        "name": "Bulk Ornament Set",
        "price": 89.99,
        "image": "/static/images/bulk-ornaments.jpg",
        "description": "Set of 24 custom company ornaments",
        "size": "business"
    },
    {
        "id": 11,
        "name": "Office Decor Kit",
        "price": 199.99,
        "image": "/static/images/office-decor.jpg",
        "description": "Complete office Christmas decoration package",
        "size": "business"
    },
    {
        "id": 12,
        "name": "Employee Gift Cards",
        "price": 249.99,
        "image": "/static/images/gift-cards.jpg",
        "description": "Custom Christmas gift card packages",
        "size": "business"
    }
]


def get_toys_by_category(category):
    """
    Return toys filtered by category
    """
    if category == 'all':
        return TOYS_DATA
    elif category in ['small', 'big', 'for_business']:
        size_filter = 'business' if category == 'for_business' else category
        return [toy for toy in TOYS_DATA if toy['size'] == size_filter]
    else:
        return []