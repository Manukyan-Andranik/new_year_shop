/**
 * translations.js
 * Multi-language support for Christmas Magic Shop
 * Languages: English, Armenian, Russian
 */

const translations = {
    en: {
        // Navigation & Header
        'nav.home': 'Home',
        'nav.about': 'About',
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
        'category.for_business': 'For Business',
        'category.product_types': 'To Product Types',

        "about.title": "About Our Christmas Magic Shop",
        "about.hero.title": "Our Christmas Story",
        "about.hero.subtitle": "Bringing Magic to Your Holidays Since 2018",
        "about.story.title": "Creating Magical Moments",
        "about.story.p1": "Founded in a small workshop filled with the scent of pine and cinnamon, Christmas Magic Shop began with a simple mission: to create decorations that capture the wonder and joy of the holiday season.",
        "about.story.p2": "What started as a family passion project has grown into a beloved destination for families worldwide who seek to make their Christmas celebrations truly special.",
        "about.stats.years": "Years of Experience",
        "about.stats.customers": "Loyal Customers",
        "about.stats.families": "Happy Families",
        "about.image.workshop": "Our First Workshop",

        "about.process.title": "Our Magical Workshop",
        "about.process.subtitle": "See how we create Christmas magic",
        "about.process.design.title": "Creative Design",
        "about.process.design.desc": "Our designers sketch and plan each decoration with attention to every magical detail.",
        "about.process.crafting.title": "Hand Crafting",
        "about.process.crafting.desc": "Each piece is carefully handcrafted by our skilled artisans using traditional techniques.",
        "about.process.finishing.title": "Magic Finishing",
        "about.process.finishing.desc": "We add the final touches that make each decoration truly special and magical.",
        "about.process.packaging.title": "Festive Packaging",
        "about.process.packaging.desc": "Every order is carefully packaged with love, ready to bring joy to your home.",

        "about.feedback.title": "What Our Customers Say",
        "about.feedback.subtitle": "Spreading Christmas joy one customer at a time",
        "about.feedback.testimonial1.text": "The decorations we bought last year made our Christmas tree absolutely magical! The quality is exceptional and they've become our family treasures.",
        "about.feedback.testimonial1.name": "Sarah Johnson",
        "about.feedback.testimonial1.role": "Happy Mom of Two",
        "about.feedback.testimonial2.text": "As a Christmas enthusiast, I'm very particular about decorations. These are by far the most beautiful and well-made ornaments I've ever owned!",
        "about.feedback.testimonial2.name": "Michael Brown",
        "about.feedback.testimonial2.role": "Christmas Collector",
        "about.feedback.testimonial3.text": "The customer service was as magical as the products! They helped me choose the perfect decorations for our office Christmas party.",
        "about.feedback.testimonial3.name": "Emma Davis",
        "about.feedback.testimonial3.role": "Office Manager",

        "about.values.title": "Our Christmas Values",
        "about.values.quality": "Handcrafted Quality",
        "about.values.quality.desc": "Each decoration is carefully designed and inspected to ensure it meets our high standards for durability and beauty.",
        "about.values.sustainable": "Sustainable Magic",
        "about.values.sustainable.desc": "We're committed to environmentally friendly practices, using sustainable materials whenever possible.",
        "about.values.family": "Family Focused",
        "about.values.family.desc": "Our designs are created with families in mind, ensuring safe, durable decorations that become cherished heirlooms.",
        "about.values.joy": "Spreading Joy",
        "about.values.joy.desc": "For every order placed, we donate a decoration to families in need during the holiday season.",

        "about.team.title": "Meet Our Elves",
        "about.team.subtitle": "The passionate team behind the magic",
        "about.team.nicholas": "Nicholas Winter",
        "about.team.nicholas.role": "Founder & Head Designer",
        "about.team.nicholas.bio": "With 5+ years in holiday decoration design, Nicholas ensures every piece tells a story.",
        "about.team.holly": "Holly Green",
        "about.team.holly.role": "Production Manager",
        "about.team.holly.bio": "Holly oversees our workshop, making sure every decoration is crafted with care and precision.",
        "about.team.rudy": "Rudy Johnson",
        "about.team.rudy.role": "Customer Experience",
        "about.team.rudy.bio": "Rudy ensures every customer feels the Christmas spirit when shopping with us.",

        "about.cta.title": "Ready to Decorate Your Tree?",
        "about.cta.description": "Browse our collection of magical decorations and create unforgettable Christmas memories.",
        "about.cta.button": "Start Shopping",
        "product_types.title": "Product Types — Wooden Gift Decorations",
        "product_types.description": "Pure, natural wood holiday decorations — choose a type to filter in the shop page.",
        "product_types.header.title": "Wooden Gift Decorations — Types",
        "product_types.header.subtitle": "Pure, natural wood holiday decorations with printed images",
        "product_types.grid.empty": "No types found",
        "product_types.grid.loading": "Loading...",
        "product_types.grid.error": "Failed to load. Please try again later.",
        "product_types.card.choose": "Choose →",
        "product_types.card.no_image": "No image",

        "product_types.modal.title": "Add New Type",
        "product_types.modal.title_label": "Title (general):",
        "product_types.modal.title_placeholder": "E.g. For you...",
        "product_types.modal.description_label": "Short description",
        "product_types.modal.description_placeholder": "Short, 1-2 lines",
        "product_types.modal.images_label": "Image(s)",
        "product_types.modal.images_placeholder": "images/x.jpg",
        "product_types.modal.images_hint": "Use relative path (e.g. <code>images/ornament1.jpg</code>).",
        "product_types.modal.cancel": "Cancel",
        "product_types.modal.save": "Save",
        "product_types.modal.saving": "Saving...",

        "product_types.validation.title_required": "Please enter a title",
        "product_types.error.save": "Error: {message}",
        "product_types.success.save": "Type added successfully"
    },

    // --- Armenian & Russian sections remain identical to your latest version ---
    hy: {
        // Navigation & Header
        'nav.home': 'Գլխավոր',
        'nav.about': 'Մեր Մասին',
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
        'category.for_business': 'Բիզնեսի համար',
        'category.product_types': 'Ապրանքի Տեսակներ',
        // About Page

        "about.title": "Մեր Սուրբ Ծննդյան Կախարդություն Խանութի Մասին",
        "about.hero.title": "Մեր Սուրբ Ծննդյան Պատմությունը",
        "about.hero.subtitle": "Կախարդանք Բերելով Ձեր Տոներին 2018-ից",
        "about.story.title": "Կախարդական Պահերի Ստեղծում",
        "about.story.p1": "Հիմնադրվել է փոքրիկ արհեստանոցում, որը լցված էր սոճու և դարչինի բույրով, Սուրբ Ծննդյան Կախարդություն խանութը սկսվել է պարզ առաքելությամբ. ստեղծել զարդարանքներ, որոնք բռնում են տոնական սեզոնի հրաշքն ու ուրախությունը:",
        "about.story.p2": "Այն, ինչ սկսվել է որպես ընտանեկան կիրք նախագիծ, վերածվել է սիրված վայրի ամբողջ աշխարհի ընտանիքների համար, որոնք ձգտում են իրենց Սուրբ Ծննդյան տոնակատարությունները դարձնել իսկապես հատուկ:",
        "about.stats.years": "Փորձի Տարիներ",
        "about.stats.customers": "Հավատարիմ Հաճախորդներ",
        "about.stats.families": "Ուրախ Ընտանիքներ",
        "about.image.workshop": "Մեր Առաջին Արհեստանոցը",

        "about.process.title": "Մեր Կախարդական Արհեստանոցը",
        "about.process.subtitle": "Տեսեք, թե ինչպես ենք մենք ստեղծում Սուրբ Ծննդյան կախարդանքը",
        "about.process.design.title": "Ստեղծագործական Դիզայն",
        "about.process.design.desc": "Մեր դիզայներները ուրվագծում և պլանավորում են յուրաքանչյուր զարդարանք՝ ուշադրություն դարձնելով յուրաքանչյուր կախարդական մանրամասնությանը:",
        "about.process.crafting.title": "Ձեռագործ Ուրվագծում",
        "about.process.crafting.desc": "Յուրաքանչյուր կտոր ուշադիր ձեռքով է պատրաստվում մեր հմուտ արհեստավորների կողմից՝ օգտագործելով ավանդական տեխնիկա:",
        "about.process.finishing.title": "Կախարդական Վերջնական Մշակում",
        "about.process.finishing.desc": "Մենք ավելացնում ենք վերջնական հպումները, որոնք յուրաքանչյուր զարդարանք դարձնում են իսկապես հատուկ և կախարդական:",
        "about.process.packaging.title": "Տոնական Փաթեթավորում",
        "about.process.packaging.desc": "Յուրաքանչյուր պատվեր ուշադիր փաթեթավորվում է սիրով՝ պատրաստ ուրախություն բերելու ձեր տուն:",

        "about.feedback.title": "Ինչ Են Ասում Մեր Հաճախորդները",
        "about.feedback.subtitle": "Տարածելով Սուրբ Ծննդյան ուրախությունը յուրաքանչյուր հաճախորդի միջոցով",
        "about.feedback.testimonial1.text": "Անցյալ տարի գնված զարդարանքները մեր Սուրբ Ծննդյան ծառը դարձրեցին բացարձակապես կախարդական: Որակը բացառիկ է, և դրանք դարձել են մեր ընտանեկան գանձերը:",
        "about.feedback.testimonial1.name": "Սառա Ջոնսոն",
        "about.feedback.testimonial1.role": "Երկու Երեխայի Ուրախ Մայր",
        "about.feedback.testimonial2.text": "Որպես Սուրբ Ծննդյան սիրահար, ես շատ բծախնդիր եմ զարդարանքների նկատմամբ: Սրանք առայժմ ամենագեղեցիկ և լավ պատրաստված զարդերն են, որ ես երբևէ ունեցել եմ:",
        "about.feedback.testimonial2.name": "Մայքլ Բրաուն",
        "about.feedback.testimonial2.role": "Սուրբ Ծննդյան Հավաքորդ",
        "about.feedback.testimonial3.text": "Հաճախորդների սպասարկումը նույնքան կախարդական էր, որքան ապրանքները: Նրանք օգնեցին ինձ ընտրել կատարյալ զարդարանքները մեր գրասենյակի Սուրբ Ծննդյան երեկոյի համար:",
        "about.feedback.testimonial3.name": "Էմմա Դևիս",
        "about.feedback.testimonial3.role": "Գրասենյակի Մենեջեր",

        "about.values.title": "Մեր Սուրբ Ծննդյան Արժեքները",
        "about.values.quality": "Ձեռագործ Որակ",
        "about.values.quality.desc": "Յուրաքանչյուր զարդարանք ուշադիր նախագծված և ստուգված է՝ ապահովելու համար, որ այն համապատասխանում է ամրության և գեղեցկության մեր բարձր չափանիշներին:",
        "about.values.sustainable": "Կայուն Կախարդանք",
        "about.values.sustainable.desc": "Մենք պարտավորված ենք շրջակա միջավայրի համար բարենպաստ պրակտիկային՝ օգտագործելով կայուն նյութեր, երբ դա հնարավոր է:",
        "about.values.family": "Ընտանիքի վրա Կենտրոնացած",
        "about.values.family.desc": "Մեր դիզայնը ստեղծված է ընտանիքների մտքով՝ ապահովելով անվտանգ, ամուր զարդարանքներ, որոնք դառնում են թանկարժեք ժառանգություն:",
        "about.values.joy": "Տարածելով Ուրախություն",
        "about.values.joy.desc": "Յուրաքանչյուր տրված պատվերի դիմաց մենք տոնական սեզոնի ընթացքում նվիրաբերում ենք զարդարանք կարիքավոր ընտանիքներին:",

        "about.team.title": "Հանդիպեք Մեր Էլֆերին",
        "about.team.subtitle": "Կիրքոտ թիմը կախարդանքի հետևում",
        "about.team.nicholas": "Նիկոլաս Ձմեռ",
        "about.team.nicholas.role": "Հիմնադիր և Գլխավոր Դիզայներ",
        "about.team.nicholas.bio": "5+ տարի տոնական զարդարանքների դիզայնում Նիկոլասը ապահովում է, որ յուրաքանչյուր կտոր պատմություն պատմի:",
        "about.team.holly": "Հոլի Կանաչ",
        "about.team.holly.role": "Արտադրության Մենեջեր",
        "about.team.holly.bio": "Հոլին վերահսկում է մեր արհեստանոցը՝ ապահովելով, որ յուրաքանչյուր զարդարանք պատրաստված է հոգատարությամբ և ճշգրտությամբ:",
        "about.team.rudy": "Ռուդի Ջոնսոն",
        "about.team.rudy.role": "Հաճախորդների Փորձ",
        "about.team.rudy.bio": "Ռուդին ապահովում է, որ յուրաքանչյուր հաճախորդ զգա Սուրբ Ծննդյան ոգին, երբ գնումներ է կատարում մեզ հետ:",

        "about.cta.title": "Պատրա՞ստ եք Զարդարել Ձեր Ծառը",
        "about.cta.description": "Թերթեք մեր կախարդական զարդարանքների հավաքածուն և ստեղծեք անմոռանալի Սուրբ Ծննդյան հիշողություններ:",
        "about.cta.button": "Սկսել Գնումները",
        "product_types.title": "Տեսակներ — Փայտյա Նվեր-զարդեր",
        "product_types.description": "Մաքուր, բնական փայտից պատրաստված տոնական զարդեր — ընտրեք տիպ՝ շոփ էջում զտելու համար.",
        "product_types.header.title": "Փայտյա Նվեր-զարդեր — Տիպեր",
        "product_types.header.subtitle": "Մաքուր, բնական փայտից պատրաստված տոնական զարդեր՝ տպագրված պատկերներով",
        "product_types.grid.empty": "Տեսակներ չեն գտնվել",
        "product_types.grid.loading": "Բեռնում...",
        "product_types.grid.error": "Չհաջողվեց բեռնել. փորձեք ուշ էլ։",
        "product_types.card.choose": "Ընտրել →",
        "product_types.card.no_image": "Պատկեր չկա",

        "product_types.modal.title": "Նոր տիպ ավելացնել",
        "product_types.modal.title_label": "Վերնագիր (ընդհանրապես):",
        "product_types.modal.title_placeholder": "Օր. Ձեզ համար...",
        "product_types.modal.description_label": "Կարճ նկարագրություն",
        "product_types.modal.description_placeholder": "Կարճ, 1-2 տող",
        "product_types.modal.images_label": "Պատկեր(ներ)",
        "product_types.modal.images_placeholder": "images/x.jpg",
        "product_types.modal.images_hint": "Օգտագործեք relative path (օր. <code>images/ornament1.jpg</code>).",
        "product_types.modal.cancel": "Չեղարկել",
        "product_types.modal.save": "Պահպանել",
        "product_types.modal.saving": "Պահպանվում...",

        "product_types.validation.title_required": "Խնդրում ենք գրել վերնագիր",
        "product_types.error.save": "Սխալ՝ {message}",
        "product_types.success.save": "Տիպը հաջողությամբ ավելացվել է"
    },

    ru: {
        // Navigation & Header
        'nav.home': 'Главная',
        'nav.about': 'О нас',
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
        'category.for_business': 'Для Бизнеса',
        'category.product_types': 'Типы Товаров',
        // About Page
        "about.title": "О Нашем Магазине Рождественского Волшебства",
        "about.hero.title": "Наша Рождественская История",
        "about.hero.subtitle": "Приносим Волшебство в Ваши Праздники с 2018 года",
        "about.story.title": "Создание Волшебных Моментов",
        "about.story.p1": "Основанная в маленькой мастерской, наполненной ароматом сосны и корицы, Рождественская Волшебная Лавка началась с простой миссии: создавать украшения, которые передают чудо и радость праздничного сезона.",
        "about.story.p2": "То, что начиналось как семейный проект по увлечению, превратилось в любимое место для семей по всему миру, которые хотят сделать свои рождественские праздники по-настоящему особенными.",
        "about.stats.years": "Лет Опыта",
        "about.stats.customers": "Верных Клиентов",
        "about.stats.families": "Счастливых Семей",
        "about.image.workshop": "Наша Первая Мастерская",

        "about.process.title": "Наша Волшебная Мастерская",
        "about.process.subtitle": "Посмотрите, как мы создаем рождественское волшебство",
        "about.process.design.title": "Креативный Дизайн",
        "about.process.design.desc": "Наши дизайнеры эскизируют и планируют каждое украшение, уделяя внимание каждой волшебной детали.",
        "about.process.crafting.title": "Ручная Работа",
        "about.process.crafting.desc": "Каждая деталь тщательно изготавливается вручную нашими опытными мастерами с использованием традиционных техник.",
        "about.process.finishing.title": "Волшебная Отделка",
        "about.process.finishing.desc": "Мы добавляем последние штрихи, которые делают каждое украшение по-настоящему особенным и волшебным.",
        "about.process.packaging.title": "Праздничная Упаковка",
        "about.process.packaging.desc": "Каждый заказ тщательно упаковывается с любовью, готовый принести радость в ваш дом.",

        "about.feedback.title": "Что Говорят Наши Клиенты",
        "about.feedback.subtitle": "Распространяем рождественскую радость одного клиента за другим",
        "about.feedback.testimonial1.text": "Украшения, которые мы купили в прошлом году, сделали нашу рождественскую елку абсолютно волшебной! Качество исключительное, и они стали нашими семейными сокровищами.",
        "about.feedback.testimonial1.name": "Сара Джонсон",
        "about.feedback.testimonial1.role": "Счастливая Мама Двоих Детей",
        "about.feedback.testimonial2.text": "Как энтузиаст Рождества, я очень разборчив в украшениях. Это самые красивые и качественные украшения, которые у меня когда-либо были!",
        "about.feedback.testimonial2.name": "Майкл Браун",
        "about.feedback.testimonial2.role": "Коллекционер Рождественских Украшений",
        "about.feedback.testimonial3.text": "Обслуживание клиентов было таким же волшебным, как и продукты! Они помогли мне выбрать идеальные украшения для нашего офисного рождественского вечера.",
        "about.feedback.testimonial3.name": "Эмма Дэвис",
        "about.feedback.testimonial3.role": "Офис-Менеджер",

        "about.values.title": "Наши Рождественские Ценности",
        "about.values.quality": "Ручная Работа",
        "about.values.quality.desc": "Каждое украшение тщательно разработано и проверено, чтобы соответствовать нашим высоким стандартам прочности и красоты.",
        "about.values.sustainable": "Устойчивое Волшебство",
        "about.values.sustainable.desc": "Мы стремимся к экологически чистым практикам, используя устойчивые материалы, когда это возможно.",
        "about.values.family": "Ориентация на Семью",
        "about.values.family.desc": "Наши дизайны созданы с учетом семей, обеспечивая безопасные, долговечные украшения, которые становятся дорогими реликвиями.",
        "about.values.joy": "Распространение Радости",
        "about.values.joy.desc": "За каждый размещенный заказ мы жертвуем украшение нуждающимся семьям в праздничный сезон.",

        "about.team.title": "Познакомьтесь с Нашими Эльфами",
        "about.team.subtitle": "Страстная команда за волшебством",
        "about.team.nicholas": "Николас Винтер",
        "about.team.nicholas.role": "Основатель и Главный Дизайнер",
        "about.team.nicholas.bio": "С 5+ годами опыта в дизайне праздничных украшений Николас следит за тем, чтобы каждая деталь рассказывала историю.",
        "about.team.holly": "Холли Грин",
        "about.team.holly.role": "Менеджер по Производству",
        "about.team.holly.bio": "Холли курирует нашу мастерскую, следя за тем, чтобы каждое украшение было изготовлено с заботой и точностью.",
        "about.team.rudy": "Руди Джонсон",
        "about.team.rudy.role": "Обслуживание Клиентов",
        "about.team.rudy.bio": "Руди следит за тем, чтобы каждый клиент чувствовал рождественский дух, совершая покупки у нас.",

        "about.cta.title": "Готовы Украсить Вашу Елку?",
        "about.cta.description": "Просмотрите нашу коллекцию волшебных украшений и создайте незабываемые рождественские воспоминания.",
        "about.cta.button": "Начать Покупки",
        "product_types.title": "Типы — Деревянные Подарочные Украшения",
        "product_types.description": "Чистые, натуральные деревянные праздничные украшения — выберите тип для фильтрации на странице магазина.",
        "product_types.header.title": "Деревянные Подарочные Украшения — Типы",
        "product_types.header.subtitle": "Чистые, натуральные деревянные праздничные украшения с напечатанными изображениями",
        "product_types.grid.empty": "Типы не найдены",
        "product_types.grid.loading": "Загрузка...",
        "product_types.grid.error": "Не удалось загрузить. Пожалуйста, попробуйте позже.",
        "product_types.card.choose": "Выбрать →",
        "product_types.card.no_image": "Нет изображения",

        "product_types.modal.title": "Добавить Новый Тип",
        "product_types.modal.title_label": "Название (общее):",
        "product_types.modal.title_placeholder": "Напр. Для вас...",
        "product_types.modal.description_label": "Краткое описание",
        "product_types.modal.description_placeholder": "Краткое, 1-2 строки",
        "product_types.modal.images_label": "Изображение(я)",
        "product_types.modal.images_placeholder": "images/x.jpg",
        "product_types.modal.images_hint": "Используйте относительный путь (напр. <code>images/ornament1.jpg</code>).",
        "product_types.modal.cancel": "Отмена",
        "product_types.modal.save": "Сохранить",
        "product_types.modal.saving": "Сохранение...",

        "product_types.validation.title_required": "Пожалуйста, введите название",
        "product_types.error.save": "Ошибка: {message}",
        "product_types.success.save": "Тип успешно добавлен"
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
