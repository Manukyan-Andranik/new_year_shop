from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime, timezone
import json
import random

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
    type = db.Column(db.String(50), index=True)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # Translation fields
    name_en = db.Column(db.String(200))
    name_hy = db.Column(db.String(200))
    name_ru = db.Column(db.String(200))
    description_en = db.Column(db.Text)
    description_hy = db.Column(db.Text)
    description_ru = db.Column(db.Text)

    
    def __repr__(self):
        return f'<Product {self.name}>'

    def get_translated(self, field_base, lang):
        field_name = f"{field_base}_{lang}"
        value = getattr(self, field_name, None)
        if value:
            return value
        return getattr(self, f"{field_base}_en", None) or getattr(self, field_base, "")

    def to_dict(self, lang='en'):
        public_desc = self.get_public_description(self.category)
        return {
            'id': self.id,
            'name': self.get_translated('name', lang),
            'price': float(self.price) if self.price else 0.0,
            'description': self.get_translated('description', lang),
            'public_description': public_desc.get(lang),
            'shape': public_desc["shape"].get(lang) or "shape",
            'images_url_list': json.loads(self.images_url_list) if self.images_url_list else [],
            'category': self.category,
            'type': self.type,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

    def get_public_description(self, category):
        public_descriptions = {
            "small": {
                "hy": {
                    "shape": "(45–55 մմ)",
                    1: """Փոքրիկ չափս, բայց մեծ զգացողություն 🌟  
    Այս խաղալիքները ձեռագործ արվեստի լավագույն օրինակն են՝ յուրաքանչյուրը ստեղծված սիրով ու համբերությամբ։ Նկարված են բարձրորակ ներկերով, փայլուն և տոնական գույներով, իսկ փայտը հատուկ մշակվել է՝ պահելով իր բնական հմայքը։ 🎨  
    45–55 մմ չափսով այս փոքրիկ հրաշքները կատարյալ են՝ որպես նուրբ ծառի զարդ կամ նվերի հետ անակնկալ հավելում 🎁։""",
                    2: """Չափերով փոքր, բայց կախարդանքով մեծ 🎄  
    Այս փայտե ձեռագործ խաղալիքները լցնում են տարածքը ուրախությամբ և ջերմությամբ։ Բարձրորակ ներկերը ապահովում են երկար կյանք և գունային կայունություն 🌈։  
    Նրանք դառնում են քո տոնի փոքրիկ մոգական շեշտադրումը՝ բերելով ժպիտ ու լույս ✨։""",
                    3: """Այս փոքրիկ խաղալիքներն ստեղծվել են սիրով, հավատով ու բարի մաղթանքներով ❤️  
    Յուրաքանչյուր խաղալիք ունի իր պատմությունը՝ փայտից ծնված ու ներկերից զարդարված։ Բարձրորակ նյութերն ապահովում են տարիների գեղեցկություն 🌟։  
    Տոնի ամենափոքր, բայց ամենաթանկ հերոսները հենց այս փոքրիկներն են 💖🎅։"""
                },
                "ru": {
                    "shape": "(45–55 мм)",
                    1: """Маленький размер — большое волшебство 🌟  
    Эти игрушки — пример лучшего ручного мастерства, созданные с любовью и терпением. Они расписаны качественными красками, сияющими праздничными оттенками, а дерево бережно обработано, сохранив свою природную красоту 🌲.  
    Размер 45–55 мм делает их идеальным украшением для елки или милым дополнением к подарку 🎁.""",
                    2: """Небольшие, но полные волшебства 🎄  
    Эти деревянные игрушки наполняют дом радостью и теплом. Яркие, стойкие краски сохраняют свои цвета на долгие годы 🌈.  
    Пусть каждая игрушка станет маленьким акцентом праздника — источником света и улыбок ✨.""",
                    3: """Созданные с любовью и добрыми пожеланиями ❤️  
    Каждая игрушка — это история, рожденная из дерева и раскрашенная вручную 🎨.  
    Они маленькие герои большого праздника — самые трогательные и ценные сувениры 💖🎅."""
                },
                "en": {
                    "shape": "(45–55 mm)",
                    1: """Small in size, big in feeling 🌟  
    These ornaments are masterpieces of handcraft — each made with love and patience. Painted with premium colors and festive sparkle, the wood is carefully treated to preserve its natural charm 🌲.  
    At 45–55 mm, these little wonders are perfect as delicate tree decor or a charming gift addition 🎁.""",
                    2: """Tiny but full of magic 🎄  
    These handmade wooden ornaments fill your home with joy and warmth. Long-lasting, vibrant colors ensure beauty for years to come 🌈.  
    Each one becomes a little highlight of your holiday — spreading smiles and light ✨.""",
                    3: """Made with love, faith, and warm wishes ❤️  
    Every piece tells its own story — born from wood, painted by hand, and glowing with festive spirit 🎨.  
    They are the smallest yet most precious heroes of the holiday season 💖🎅."""
                }
            },

            "large": {
                "hy": {
                    "shape": "(55–70 մմ)",
                    1: """Այս խաղալիքները մեծ են ոչ միայն չափով, այլև իրենց տոնական ոգով ✨  
    55–70 մմ տրամաչափով խաղալիքները դառնում են տոնածառի գլխավոր զարդը՝ գրավելով ուշադրություն փայլով ու ձեռքի աշխատանքի նրբությամբ 🌟։  
    Փայտը բարձրորակ է, խնամքով մշակված՝ ապահովելով ամրություն և գեղեցկություն։ Ներկված են ոչ թունավոր, երկարատև ներկերով՝ պահպանելով իրենց տեսքը տարիներ շարունակ 🎨.""",
                    2: """Մեր մեծ խաղալիքները համադրում են դասական ձևը և ժամանակակից վարպետությունը 🎁  
    Յուրաքանչյուր խաղալիք պատրաստվում է ձեռքով՝ փայլուն և ջերմ գույներով։ Նրանք ոչ միայն ծառի զարդ են, այլև փոքր արվեստի գործ՝ լի տոնական էներգիայով ✨։  
    55–70 մմ չափսի խաղալիքը դառնում է կենտրոնական տարր՝ ինչպես ծառի, այնպես էլ տան դեկորի համար 🎄.""",
                    3: """55–70 մմ տրամաչափով խաղալիքները մարմնավորում են ձմեռային հրաշքի ամբողջ կախարդանքը ❄️  
    Ձեռագործ, յուրահատուկ և հիշեցում տան ջերմության մասին 💫։  
    Բարձրորակ ներկերն ու փայտի նուրբ մշակումը դարձնում են դրանք հիասքանչ արվեստի նմուշներ՝ պատրաստված հատուկ քո տոնի համար 🎅."""
                },
                "ru": {
                    "shape": "(55–70 мм)",
                    1: """Эти игрушки велики не только размером, но и праздничным духом ✨  
    Игрушки диаметром 55–70 мм становятся главным украшением елки, сияя блеском ручной работы 🌟.  
    Качественное дерево и нетоксичные краски обеспечивают долговечность и естественную красоту 🎨.""",
                    2: """Наши большие игрушки сочетают классику и современное мастерство 🎁  
    Каждая игрушка создается вручную, покрытая яркими и теплыми красками.  
    Они не просто украшения, а настоящие произведения искусства, наполненные праздничной энергией ✨.  
    Размер 55–70 мм делает их центральным элементом вашего декора 🎄.""",
                    3: """Игрушки диаметром 55–70 мм воплощают всю магию зимнего чуда ❄️  
    Ручная работа, уникальность и тепло домашнего уюта 💫.  
    Благодаря качественным материалам и тонкой отделке они становятся настоящими шедеврами, созданными специально для вашего праздника 🎅."""
                },
                "en": {
                    "shape": "(55–70 mm)",
                    1: """These ornaments are grand not only in size but also in festive spirit ✨  
    At 55–70 mm, they become the centerpiece of your Christmas tree — shining with handcrafted detail and warmth 🌟.  
    Made from high-quality wood and painted with long-lasting, non-toxic colors, they stay beautiful for many holidays to come 🎨.""",
                    2: """Our large ornaments combine classic design with modern craftsmanship 🎁  
    Each one is handmade and painted in warm, vibrant tones — a true work of art filled with festive energy ✨.  
    The 55–70 mm size makes them the perfect centerpiece for your tree or home décor 🎄.""",
                    3: """At 55–70 mm, these ornaments capture the full magic of the winter season ❄️  
    Handcrafted, unique, and full of warmth 💫.  
    Premium materials and fine detailing make them timeless art pieces — created especially for your celebration 🎅."""
                }
            }
        }

        # Pick random variant (1, 2, or 3)
        idx = random.randint(1, 3)
        descs = public_descriptions.get(category)

        if not descs:
            raise ValueError(f"Unknown category: {category}")

        public_desc = {
            "hy": descs["hy"].get(idx),
            "ru": descs["ru"].get(idx),
            "en": descs["en"].get(idx),
            "shape": {
                "hy": descs["hy"]["shape"],
                "ru": descs["ru"]["shape"],
                "en": descs["en"]["shape"]
            }
        }

        return public_desc


class Order(db.Model):
    __tablename__ = 'orders'
    __table_args__ = {'schema': 'newyear_shop_schema'}

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
    __table_args__ = {'schema': 'newyear_shop_schema'}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    
    def __repr__(self):
        return f'<AdminUser {self.username}>'

class ProductType(db.Model):
    __tablename__ = "product_types"
    __table_args__ = {'schema': 'newyear_shop_schema'}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False, unique=True, index=True)
    title = db.Column(db.String(250), nullable=False, unique=True, index=True)
    description = db.Column(db.String(1024))
    image_url = db.Column(db.String(200))

    # Translation fields
    title_en = db.Column(db.String(250))
    title_hy = db.Column(db.String(250))
    title_ru = db.Column(db.String(250))
    description_en = db.Column(db.Text)
    description_hy = db.Column(db.Text)
    description_ru = db.Column(db.Text)

    def image_url_full(self, prefix: str = "") -> str:
        """Return full image URL or default placeholder."""
        default = "http://logiclab.am/mandarin/static/images/default_product_type_image.png"
        # if not self.image_url:
        #     return default
        # if self.image_url.startswith("http"):
        #     return self.image_url
        # if prefix:
        #     if not prefix.endswith("/") and not self.image_url.startswith("/"):
        #         return prefix + "/" + self.image_url
        #     return prefix.rstrip("/") + "/" + self.image_url.lstrip("/")
        return default

    def get_translated(self, field_base, lang):
        field_name = f"{field_base}_{lang}"
        value = getattr(self, field_name, None)
        if value:
            return value
        return getattr(self, f"{field_base}_en", None) or getattr(self, field_base, "")

    def to_dict(self, lang='en'):
        return {
            "id": self.id,
            "type": self.type,
            "title": self.get_translated("title", lang),
            "description": self.get_translated("description", lang),
            "image_url": self.image_url_full()
        }

    def __repr__(self):
        return f"<ProductType {self.title}>"

class ProductTypesSamples:
    def __init__(self):
        self.data = [
            {
                "type": "teacher",
                "title_hy": "Ձեր սիրելի դպրոցի/մանկապարտեզի ուսուցիչների համար",
                "title_en": "For your favorite school/kindergarten teachers",
                "title_ru": "Для ваших любимых учителей школы/детского сада",
                "description_hy": "Տոնական փայտե զարդեր՝ ուսուցիչների և դաստիարակների համար։",
                "description_en": "Festive wooden ornaments for teachers and educators.",
                "description_ru": "Праздничные деревянные украшения для учителей и воспитателей.",
                "image_url": "images/default_product_type_image.png",
            },
            {
                "type": "staff",
                "title_hy": "Սիրելի աշխատակիցների համար",
                "title_en": "For beloved staff members",
                "title_ru": "Для любимых сотрудников",
                "description_hy": "Փայտե տոնական նվերներ՝ գործընկերների համար։",
                "description_en": "Wooden holiday gifts for colleagues.",
                "description_ru": "Деревянные праздничные подарки для коллег.",
                "image_url": "images/default_product_type_image.png",
            },
            {
                "type": "love",
                "title_hy": "Սիրելիս համար",
                "title_en": "For your loved one",
                "title_ru": "Для любимого человека",
                "description_hy": "Հուշարժեք փայտե խաղալիքներ՝ սիրելիի համար։",
                "description_en": "Memorable wooden toys for your loved one.",
                "description_ru": "Деревянные сувениры для любимого человека.",
                "image_url": "images/default_product_type_image.png",
            },
            {
                "type": "friend",
                "title_hy": "Ընկերոջ համար",
                "title_en": "For a friend",
                "title_ru": "Для друга",
                "description_hy": "Բնավորությամբ լի զարդեր՝ ձեր լավ ընկերոջ համար։",
                "description_en": "Personality-filled ornaments for your friend.",
                "description_ru": "Украшения, полные характера, для вашего друга.",
                "image_url": "images/default_product_type_image.png",
            },
            {
                "type": "family",
                "title_hy": "Ընտանիքի համար",
                "title_en": "For the family",
                "title_ru": "Для семьи",
                "description_hy": "Փայտե խաղալիքների հավաքածու՝ ընտանեկան հիշողությունների համար։",
                "description_en": "Wooden toy sets for family memories.",
                "description_ru": "Наборы деревянных игрушек для семейных воспоминаний.",
                "image_url": "images/default_product_type_image.png",
            },
            {
                "type": "corporate",
                "title_hy": "Կորպորատիվի համար",
                "title_en": "For corporate clients",
                "title_ru": "Для корпоративных клиентов",
                "description_hy": "Բրենդավորմամբ զարդեր՝ ձեր թիմի և գործընկերների համար։",
                "description_en": "Branded ornaments for your team and partners.",
                "description_ru": "Брендированные украшения для вашей команды и партнеров.",
                "image_url": "images/default_product_type_image.png",
            },
            {
                "type": "custom",
                "title_hy": "Այլ",
                "title_en": "Custom / Other",
                "title_ru": "Другие / По заказу",
                "description_hy": "Հատուկ պատվերներ՝ ցանկացած առիթի համար։",
                "description_en": "Special orders for any occasion.",
                "description_ru": "Специальные заказы для любого случая.",
                "image_url": "images/default_product_type_image.png",
            },
        ]

    def get_all(self):
        return self.data

    def get_by_type(self, type):
        return [item for item in self.data if item["type"] == type]