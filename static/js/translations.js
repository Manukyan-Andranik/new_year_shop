/**
 * translations.js
 * Multi-language support for Christmas Magic Shop
 * Languages: English, Armenian, Russian
 */

const translations = {
    en: {
        // Navigation & Header
        'nav.home': 'Home',
        'nav.shop': 'Shop',
        'nav.admin': 'Admin',
        'logo.title': 'Christmas Magic',

        // Main Page
        'catalog.title': '🎁 Toy Catalog',
        'category.all': 'All Toys',
        'category.small': 'Small',
        'category.big': 'Big',
        'category.business': 'For Business',
        'checkout.button': 'Send to Santa',
        'checkout.disabled': 'Proceed to checkout',
        'cert.badge': 'toys on tree',

        // Product Cards
        'product.add': 'Add to Tree',
        'product.add.aria': 'Add {name} to cart',
        'product.price': '${price}',

        // Order Modal
        'order.title': '✉️ Letter to Santa — Your Christmas Wishes',
        'order.subtitle': 'Let\'s make sure Santa gets your favorite toys right!',
        'order.preview': 'Order Preview',
        'order.items': '{count} items',
        'order.total': 'Total:',
        'order.empty': 'Your letter to Santa is empty!',
        'order.form.name': 'Your Name',
        'order.form.email': 'Your Email',
        'order.form.phone': 'Your Phone',
        'order.form.message': 'Your Message to Santa',
        'order.buttons.back': 'Back to Shop 🛒',
        'order.buttons.send': 'Send to Santa ✨',
        'order.sending': 'Sending...',

        // Success Modal
        'success.title': '💌 Letter Sent to Santa!',
        'success.message': 'Your heartfelt Christmas wish has just fluttered across the snowy skies to the North Pole! 🎄 Santa\'s elves are already wrapping your chosen toys with ribbons and magic dust. Thank you for keeping the Christmas spirit alive! 🌟',
        'success.signature': '✨ With love and festive cheer,<br>Santa\'s Workshop 🎅',
        'success.continue': 'Continue Shopping 🎁',

        // Product Modal
        'product.modal.title': 'Toy Name',
        'product.modal.price': '$0.00',
        'product.modal.description': 'Product description.',
        'product.modal.add': '🎁 Add to Tree',
        'product.modal.close': 'Close',
        'product.gallery.prev': 'Previous image',
        'product.gallery.next': 'Next image',
        'product.gallery.thumbs': 'Product images',

        // Announcements
        'announcement.added': '{name} added to the tree',
        'announcement.order.success': 'Order successfully sent to Santa!',

        // Error Messages
        'error.loading': 'Oh no! 😔',
        'error.loading.message': 'Something went wrong while loading the toy workshop. Please try again later.',
        'error.order.failed': 'Failed to send order. Please try again.',

        // Footer
        'footer.title': '🎁 Christmas Magic Shop',
        'footer.description': 'Bringing holiday joy to homes since 2023. Our handpicked decorations make every Christmas magical.',
        'footer.contact.title': '📞 Contact Info',
        'footer.contact.email': '🎄 Email: hello@christmasmagic.com',
        'footer.contact.phone': '📞 Phone: (555) 123-CHRISTMAS',
        'footer.contact.address': '📍 123 Snowflake Lane, North Pole',
        'footer.links.title': '🔗 Quick Links',
        'footer.links.home': 'Home',
        'footer.links.shop': 'Shop Collection',
        'footer.links.admin': 'Admin Dashboard',
        'footer.copyright': '&copy; 2023 Christmas Magic Shop. Spreading holiday cheer one decoration at a time. 🎅',

        // Admin
        'admin.login.title': '🎄 Admin Login',
        'admin.login.username': 'Username',
        'admin.login.password': 'Password',
        'admin.login.button': 'Login',
        'admin.login.back': '← Back to Shop',
        'admin.dashboard.title': '🎅 Admin Dashboard',
        'admin.dashboard.orders': 'View Orders',
        'admin.dashboard.shop': 'View Shop',
        'admin.dashboard.logout': 'Logout',
        'admin.dashboard.products': 'Product Management',
        'admin.dashboard.add.title': 'Add New Product',
        'admin.dashboard.add.name': 'Product Name',
        'admin.dashboard.add.price': 'Price',
        'admin.dashboard.add.description': 'Description',
        'admin.dashboard.add.category': 'Category',
        'admin.dashboard.add.images': 'Image URLs (one per line)',
        'admin.dashboard.add.button': 'Add Product',
        'admin.dashboard.existing': 'Existing Products',
        'admin.dashboard.edit': 'Edit',
        'admin.dashboard.delete': 'Delete',
        'admin.dashboard.success.add': 'Product added successfully!',
        'admin.dashboard.success.delete': 'Product deleted successfully!',
        'admin.dashboard.confirm.delete': 'Are you sure you want to delete this product?',
        'admin.dashboard.error.add': 'Failed to add product',
        'admin.dashboard.error.delete': 'Error deleting product',
        'admin.orders.title': '📦 Order Management',
        'admin.orders.products': 'Products',
        'admin.orders.shop': 'View Shop',
        'admin.orders.logout': 'Logout',
        'admin.orders.customers': 'Customer Orders',
        'admin.orders.order': 'Order #{id}',
        'admin.orders.customer': 'Customer:',
        'admin.orders.phone': 'Phone:',
        'admin.orders.email': 'Email:',
        'admin.orders.status': 'Status:',
        'admin.orders.comment': 'Comment:',
        'admin.orders.items': 'Items:',
        'admin.orders.total': 'Total:',
        'admin.orders.status.new': 'New',
        'admin.orders.status.processed': 'Processed',
        'admin.orders.status.shipped': 'Shipped',
        'admin.orders.empty': 'No orders found.',
        'admin.orders.error.update': 'Error updating order status',
        'admin.orders.error.failed': 'Failed to update order status',

        // Categories
        'category.ornaments': 'Ornaments',
        'category.lights': 'Lights',
        'category.stars': 'Stars',
        'category.figures': 'Figures',
        'category.for_business': 'For Business'
    },

    // --- Armenian & Russian sections remain identical to your latest version ---
    hy: {
        // Navigation & Header
        'nav.home': 'Գլխավոր',
        'nav.shop': 'Խանութ',
        'nav.admin': 'Ադմին',
        'logo.title': 'Սուրբ Ծննդյան Կախարդություն',

        // Main Page
        'catalog.title': '🎁 Խաղալիքների Կատալոգ',
        'category.all': 'Բոլոր Խաղալիքները',
        'category.small': 'Փոքր',
        'category.big': 'Մեծ',
        'category.business': 'Բիզնեսի համար',
        'checkout.button': 'Ուղարկել Սանտային',
        'checkout.disabled': 'Անցնել պատվերի',
        'cert.badge': 'խաղալիքներ ծառի վրա',


        // Product Cards
        'product.add': 'Ավելացնել Ծառին',
        'product.add.aria': 'Ավելացնել {name} զամբյուղում',
        'product.price': '${price}',

        // Order Modal
        'order.title': '✉️ Նամակ Սանտային — Ձեր Ամանորյա Ցանկությունները',
        'order.subtitle': 'Անպայման ստուգենք, որ Սանտան ձեր սիրելի խաղալիքները ստանա!',
        'order.preview': 'Պատվերի Նախադիտում',
        'order.items': '{count} ապրանք',
        'order.total': 'Ընդամենը:',
        'order.empty': 'Ձեր նամակը Սանտային դատարկ է!',
        'order.form.name': 'Ձեր Անունը',
        'order.form.email': 'Ձեր Էլ. Փոստը',
        'order.form.phone': 'Ձեր Հեռախոսը',
        'order.form.message': 'Ձեր Հաղորդագրությունը Սանտային',
        'order.buttons.back': 'Վերադառնալ Խանութ 🛒',
        'order.buttons.send': 'Ուղարկել Սանտային ✨',
        'order.sending': 'Ուղարկվում է...',

        // Success Modal
        'success.title': '💌 Նամակը Ուղարկվել է Սանտային!',
        'success.message': 'Ձեր սրտանց Սուրբ Ծննդյան ցանկությունը հենց նոր թռավ ձյան երկնքով դեպի Հյուսիսային բևեռ! 🎄 Սանտայի էլֆերը արդեն փաթաթում են ձեր ընտրած խաղալիքները ժապավեններով և կախարդական փոշով: Շնորհակալություն Սուրբ Ծննդյան ոգին կենդանի պահելու համար! 🌟',
        'success.signature': '✨ Սիրով և տոնական ուրախությամբ,<br>Սանտայի Արհեստանոցը 🎅',
        'success.continue': 'Շարունակել Գնումները 🎁',

        // Product Modal
        'product.modal.title': 'Խաղալիքի Անունը',
        'product.modal.price': '$0.00',
        'product.modal.description': 'Ապրանքի նկարագրություն:',
        'product.modal.add': '🎁 Ավելացնել Ծառին',
        'product.modal.close': 'Փակել',
        'product.gallery.prev': 'Նախորդ պատկեր',
        'product.gallery.next': 'Հաջորդ պատկեր',
        'product.gallery.thumbs': 'Ապրանքի պատկերներ',

        // Announcements
        'announcement.added': '{name} ավելացվել է ծառին',
        'announcement.order.success': 'Պատվերը հաջողությամբ ուղարկվել է Սանտային!',

        // Error Messages
        'error.loading': 'Օհ ոչ! 😔',
        'error.loading.message': 'Ինչ-որ բան սխալ է եղել խաղալիքների արհեստանոցը բեռնելիս: Խնդրում ենք փորձել ավելի ուշ:',
        'error.order.failed': 'Պատվերը ուղարկելը ձախողվեց: Խնդրում ենք փորձել կրկին:',

        // Footer
        'footer.title': '🎁 Սուրբ Ծննդյան Կախարդություն Խանութ',
        'footer.description': 'Տանը տոնական ուրախություն բերելով 2023 թվականից: Մեր ձեռքով ընտրված զարդարանքները յուրաքանչյուր Սուրբ Ծնունդը դարձնում են կախարդական:',
        'footer.contact.title': '📞 Կապի Տվյալներ',
        'footer.contact.email': '🎄 Էլ. Փոստ: hello@christmasmagic.com',
        'footer.contact.phone': '📞 Հեռախոս: (555) 123-CHRISTMAS',
        'footer.contact.address': '📍 123 Ձյան փաթիլի փողոց, Հյուսիսային բևեռ',
        'footer.links.title': '🔗 Արագ Հղումներ',
        'footer.links.home': 'Գլխավոր',
        'footer.links.shop': 'Խանութի Հավաքածու',
        'footer.links.admin': 'Ադմինի Գրասենյակ',
        'footer.copyright': '&copy; 2023 Սուրբ Ծննդյան Կախարդություն Խանութ: Տոնական ուրախություն տարածելով մեկ զարդարանքով: 🎅',

        // Admin Pages
        'admin.login.title': '🎄 Ադմինի Մուտք',
        'admin.login.username': 'Օգտանուն',
        'admin.login.password': 'Գաղտնաբառ',
        'admin.login.button': 'Մուտք',
        'admin.login.back': '← Վերադառնալ Խանութ',

        'admin.dashboard.title': '🎅 Ադմինի Գրասենյակ',
        'admin.dashboard.orders': 'Դիտել Պատվերները',
        'admin.dashboard.shop': 'Դիտել Խանութը',
        'admin.dashboard.logout': 'Ելք',
        'admin.dashboard.products': 'Ապրանքների Կառավարում',
        'admin.dashboard.add.title': 'Ավելացնել Նոր Ապրանք',
        'admin.dashboard.add.name': 'Ապրանքի Անունը',
        'admin.dashboard.add.price': 'Գին',
        'admin.dashboard.add.description': 'Նկարագրություն',
        'admin.dashboard.add.category': 'Կատեգորիա',
        'admin.dashboard.add.images': 'Պատկերի URL-ներ (մեկ տողում մեկ)',
        'admin.dashboard.add.button': 'Ավելացնել Ապրանք',
        'admin.dashboard.existing': 'Գոյություն ունեցող Ապրանքներ',
        'admin.dashboard.edit': 'Խմբագրել',
        'admin.dashboard.delete': 'Ջնջել',
        'admin.dashboard.success.add': 'Ապրանքը հաջողությամբ ավելացվել է!',
        'admin.dashboard.success.delete': 'Ապրանքը հաջողությամբ ջնջվել է!',
        'admin.dashboard.confirm.delete': 'Համոզված եք, որ ցանկանում եք ջնջել այս ապրանքը?',
        'admin.dashboard.error.add': 'Ապրանքը ավելացնելը ձախողվեց',
        'admin.dashboard.error.delete': 'Ապրանքը ջնջելիս սխալ',

        'admin.orders.title': '📦 Պատվերների Կառավարում',
        'admin.orders.products': 'Ապրանքներ',
        'admin.orders.shop': 'Դիտել Խանութը',
        'admin.orders.logout': 'Ելք',
        'admin.orders.customers': 'Հաճախորդների Պատվերներ',
        'admin.orders.order': 'Պատվեր #{id}',
        'admin.orders.customer': 'Հաճախորդ:',
        'admin.orders.phone': 'Հեռախոս:',
        'admin.orders.email': 'Էլ. Փոստ:',
        'admin.orders.status': 'Կարգավիճակ:',
        'admin.orders.comment': 'Մեկնաբանություն:',
        'admin.orders.items': 'Ապրանքներ:',
        'admin.orders.total': 'Ընդամենը:',
        'admin.orders.status.new': 'Նոր',
        'admin.orders.status.processed': 'Մշակված',
        'admin.orders.status.shipped': 'Ուղարկված',
        'admin.orders.empty': 'Պատվերներ չեն գտնվել:',
        'admin.orders.error.update': 'Պատվերի կարգավիճակը թարմացնելիս սխալ',
        'admin.orders.error.failed': 'Պատվերի կարգավիճակը թարմացնելը ձախողվեց',

        // Categories
        'category.ornaments': 'Զարդարանքներ',
        'category.lights': 'Լույսեր',
        'category.stars': 'Աստղեր',
        'category.figures': 'Բնորդներ',
        'category.for_business': 'Բիզնեսի համար'
    },

    ru: {
        // Navigation & Header
        'nav.home': 'Главная',
        'nav.shop': 'Магазин',
        'nav.admin': 'Админ',
        'logo.title': 'Рождественское Волшебство',

        // Main Page
        'catalog.title': '🎁 Каталог Игрушек',
        'category.all': 'Все Игрушки',
        'category.small': 'Маленькие',
        'category.big': 'Большие',
        'category.business': 'Для Бизнеса',
        'cert.badge': 'игрушек на дереве',
        'checkout.button': 'Отправить Санте',
        'checkout.disabled': 'Перейти к заказу',

        // Product Cards
        'product.add': 'Добавить на Дерево',
        'product.add.aria': 'Добавить {name} в корзину',
        'product.price': '${price}',

        // Order Modal
        'order.title': '✉️ Письмо Санте — Ваши Рождественские Желания',
        'order.subtitle': 'Давайте убедимся, что Санта получит ваши любимые игрушки!',
        'order.preview': 'Предварительный Просмотр Заказа',
        'order.items': '{count} товаров',
        'order.total': 'Итого:',
        'order.empty': 'Ваше письмо Санте пустое!',
        'order.form.name': 'Ваше Имя',
        'order.form.email': 'Ваш Email',
        'order.form.phone': 'Ваш Телефон',
        'order.form.message': 'Ваше Сообщение Санте',
        'order.buttons.back': 'Вернуться в Магазин 🛒',
        'order.buttons.send': 'Отправить Санте ✨',
        'order.sending': 'Отправляется...',

        // Success Modal
        'success.title': '💌 Письмо Отправлено Санте!',
        'success.message': 'Ваше сердечное рождественское желание только что пронеслось по снежному небу к Северному полюсу! 🎄 Эльфы Санты уже заворачивают ваши выбранные игрушки лентами и волшебной пылью. Спасибо за то, что поддерживаете рождественский дух! 🌟',
        'success.signature': '✨ С любовью и праздничным настроением,<br>Мастерская Санты 🎅',
        'success.continue': 'Продолжить Покупки 🎁',

        // Product Modal
        'product.modal.title': 'Название Игрушки',
        'product.modal.price': '$0.00',
        'product.modal.description': 'Описание товара.',
        'product.modal.add': '🎁 Добавить на Дерево',
        'product.modal.close': 'Закрыть',
        'product.gallery.prev': 'Предыдущее изображение',
        'product.gallery.next': 'Следующее изображение',
        'product.gallery.thumbs': 'Изображения товара',


        'qty.decrease': 'Уменьшить количество',
        'qty.increase': 'Увеличить количество',
        'qty.label': 'Количество для {name}',

        // Announcements
        'announcement.added': '{name} добавлено на дерево',
        'announcement.order.success': 'Заказ успешно отправлен Санте!',

        // Error Messages
        'error.loading': 'О нет! 😔',
        'error.loading.message': 'Что-то пошло не так при загрузке мастерской игрушек. Пожалуйста, попробуйте позже.',
        'error.order.failed': 'Не удалось отправить заказ. Пожалуйста, попробуйте снова.',

        // Footer
        'footer.title': '🎁 Магазин Рождественского Волшебства',
        'footer.description': 'Приносим праздничную радость в дома с 2023 года. Наши тщательно отобранные украшения делают каждое Рождество волшебным.',
        'footer.contact.title': '📞 Контактная Информация',
        'footer.contact.email': '🎄 Email: hello@christmasmagic.com',
        'footer.contact.phone': '📞 Телефон: (555) 123-CHRISTMAS',
        'footer.contact.address': '📍 123 Снежинка Лейн, Северный Полюс',
        'footer.links.title': '🔗 Быстрые Ссылки',
        'footer.links.home': 'Главная',
        'footer.links.shop': 'Коллекция Магазина',
        'footer.links.admin': 'Админ Панель',
        'footer.copyright': '&copy; 2023 Магазин Рождественского Волшебства. Распространяем праздничное настроение одним украшением за раз. 🎅',

        // Admin Pages
        'admin.login.title': '🎄 Вход Администратора',
        'admin.login.username': 'Имя пользователя',
        'admin.login.password': 'Пароль',
        'admin.login.button': 'Войти',
        'admin.login.back': '← Вернуться в Магазин',

        'admin.dashboard.title': '🎅 Админ Панель',
        'admin.dashboard.orders': 'Просмотр Заказов',
        'admin.dashboard.shop': 'Просмотр Магазина',
        'admin.dashboard.logout': 'Выйти',
        'admin.dashboard.products': 'Управление Товарами',
        'admin.dashboard.add.title': 'Добавить Новый Товар',
        'admin.dashboard.add.name': 'Название Товара',
        'admin.dashboard.add.price': 'Цена',
        'admin.dashboard.add.description': 'Описание',
        'admin.dashboard.add.category': 'Категория',
        'admin.dashboard.add.images': 'URL изображений (по одному на строку)',
        'admin.dashboard.add.button': 'Добавить Товар',
        'admin.dashboard.existing': 'Существующие Товары',
        'admin.dashboard.edit': 'Редактировать',
        'admin.dashboard.delete': 'Удалить',
        'admin.dashboard.success.add': 'Товар успешно добавлен!',
        'admin.dashboard.success.delete': 'Товар успешно удален!',
        'admin.dashboard.confirm.delete': 'Вы уверены, что хотите удалить этот товар?',
        'admin.dashboard.error.add': 'Не удалось добавить товар',
        'admin.dashboard.error.delete': 'Ошибка при удалении товара',

        'admin.orders.title': '📦 Управление Заказами',
        'admin.orders.products': 'Товары',
        'admin.orders.shop': 'Просмотр Магазина',
        'admin.orders.logout': 'Выйти',
        'admin.orders.customers': 'Заказы Клиентов',
        'admin.orders.order': 'Заказ #{id}',
        'admin.orders.customer': 'Клиент:',
        'admin.orders.phone': 'Телефон:',
        'admin.orders.email': 'Email:',
        'admin.orders.status': 'Статус:',
        'admin.orders.comment': 'Комментарий:',
        'admin.orders.items': 'Товары:',
        'admin.orders.total': 'Итого:',
        'admin.orders.status.new': 'Новый',
        'admin.orders.status.processed': 'Обработан',
        'admin.orders.status.shipped': 'Отправлен',
        'admin.orders.empty': 'Заказы не найдены.',
        'admin.orders.error.update': 'Ошибка обновления статуса заказа',
        'admin.orders.error.failed': 'Не удалось обновить статус заказа',

        // Categories
        'category.ornaments': 'Украшения',
        'category.lights': 'Огни',
        'category.stars': 'Звезды',
        'category.figures': 'Фигурки',
        'category.for_business': 'Для Бизнеса'
    }
};

async function loadProducts(lang = 'en') {
    const response = await fetch(`api/products?lang=${lang}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const products = await response.json();

    // 3. Initialize the UI with the data and scene functions
    initUI(products, sceneFunctions);
    
    window.christmasShopInitialized = true;
}


// ✅ Translation system
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.updateLanguage();
        this.createLanguageSwitcher();
        this.updatePageContent();
    }

    t(key, params = {}) {
        let translation = translations[this.currentLanguage]?.[key]
            || translations['en']?.[key]
            || key;

        for (const [param, value] of Object.entries(params)) {
            translation = translation.replace(`{${param}}`, value);
        }
        return translation;
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.updateLanguage();
            this.updatePageContent();
            this.updateLanguageSwitcherUI();
            loadProducts(lang);
          
        }
    }

    updateLanguage() {
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.dir = 'ltr';
    }

    createLanguageSwitcher() {
        if (document.getElementById('language-switcher')) return;
        const switcher = document.createElement('div');
        switcher.id = 'language-switcher';
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button id="current-lang" class="lang-btn main-btn">
                ${this.getLangLabel(this.currentLanguage)}
            </button>
            <div id="lang-menu" class="lang-menu hidden">
                ${this.getOtherLanguages()
                    .map(lang => `<button class="lang-btn" data-lang="${lang}">${this.getLangLabel(lang)}</button>`)
                    .join('')}
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .language-switcher { position: fixed; top: 20px; right: 20px; z-index: 1000;
                background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15); backdrop-filter: blur(8px); }
            .lang-btn { border: none; background: transparent; cursor: pointer;
                font-size: 12px; font-weight: 600; color: #444; padding: 6px 10px;
                width: 100%; text-align: left; transition: background 0.2s ease; }
            .lang-btn:hover { background: rgba(45,138,67,0.1); color: var(--festive-green); }
            .main-btn { font-size: 13px; font-weight: 700; border-radius: 15px;
                background: var(--festive-green); color: #fff; }
            .lang-menu { display: none; position: absolute; top: 40px; right: 0;
                background: white; border-radius: 12px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                padding: 4px 0; min-width: 90px; }
            .lang-menu.show { display: block; }
        `;
        document.head.appendChild(style);
        document.body.appendChild(switcher);

        const currentBtn = switcher.querySelector('#current-lang');
        const menu = switcher.querySelector('#lang-menu');
        currentBtn.addEventListener('click', e => {
            e.stopPropagation();
            menu.classList.toggle('show');
        });
        menu.addEventListener('click', e => {
            if (e.target.dataset.lang) {
                this.setLanguage(e.target.dataset.lang);
                menu.classList.remove('show');
            }
        });
        document.addEventListener('click', e => {
            if (!switcher.contains(e.target)) menu.classList.remove('show');
        });
    }

    updateLanguageSwitcherUI() {
        const currentBtn = document.getElementById('current-lang');
        const menu = document.getElementById('lang-menu');
        if (!currentBtn || !menu) return;
        currentBtn.innerHTML = this.getLangLabel(this.currentLanguage);
        menu.innerHTML = this.getOtherLanguages()
            .map(lang => `<button class="lang-btn" data-lang="${lang}">${this.getLangLabel(lang)}</button>`)
            .join('');
    }

    updateProductsCatalogLanguage() {
        const productCards = document.querySelectorAll('.product-card');
        if (!productCards.length || !window.products) return;

        productCards.forEach(card => {
            const id = parseInt(card.dataset.productId);
            const product = window.products.find(p => p.id === id);
            if (!product || !product.translations) return;
            const lang = this.currentLanguage;
            const name = product.translations.name?.[lang] || product.name;
            const nameEl = card.querySelector('.product-name');
            const descEl = card.querySelector('.product-short');
            const btnEl = card.querySelector('.add-btn');
            if (nameEl) nameEl.textContent = name;
            if (descEl) descEl.textContent = desc;
            if (btnEl) {
                btnEl.innerHTML = `<span class="icon">🎁</span>${this.t('product.add')}`;
                btnEl.setAttribute('aria-label', this.t('product.add.aria', { name }));
            }
        });
    }

    getLangLabel(lang) {
        return { en: '🇺🇸 EN', hy: '🇦🇲 HY', ru: '🇷🇺 RU' }[lang] || lang.toUpperCase();
    }

    getOtherLanguages() {
        return ['en', 'hy', 'ru'].filter(l => l !== this.currentLanguage);
    }

    updatePageContent() {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const params = JSON.parse(el.getAttribute('data-translate-params') || '{}');
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')
                el.placeholder = this.t(key, params);
            else el.textContent = this.t(key, params);
        });
        document.querySelectorAll('[data-translate-title]').forEach(el => {
            el.title = this.t(el.dataset.translateTitle, JSON.parse(el.dataset.translateTitleParams || '{}'));
        });
        document.querySelectorAll('[data-translate-aria]').forEach(el => {
            el.setAttribute('aria-label', this.t(el.dataset.translateAria, JSON.parse(el.dataset.translateAriaParams || '{}')));
        });
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage, t: this.t.bind(this) }
        }));
    }
}

window.translationManager = new TranslationManager();
window.t = window.translationManager.t.bind(window.translationManager);
