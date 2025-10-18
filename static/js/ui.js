/**
 * ui.js
 * Handles all DOM interactions, event listeners, and UI state management.
 */

let products = [];
let cart = [];
let sceneFunctions = {}; // To hold functions from scene.js

// --- DOM Element Selectors ---
const dom = {
    productGrid: document.querySelector('.product-grid'),
    announcements: document.getElementById('announcements'),
    cartCount: document.getElementById('cart-count'),
    checkoutBtn: document.getElementById('checkout-btn'),
    // Order Modal
    orderModal: document.getElementById('order-modal'),
    orderList: document.getElementById('order-list'),
    paperTotal: document.getElementById('paper-total'),
    modalItemsCount: document.getElementById('modal-items-count'),
    orderForm: document.getElementById('order-form'),
    paperConfirm: document.getElementById('paper-confirm'),
    paperCancel: document.getElementById('paper-cancel'),
    // Success Modal
    successOverlay: document.getElementById('success-overlay'),
    closeSuccessBtn: document.getElementById('close-success'),
    // Product Modal
    productModal: document.getElementById('product-modal'),
    galleryImage: document.getElementById('gallery-image'),
    galleryThumbs: document.getElementById('gallery-thumbs'),
    galleryPrev: document.getElementById('gallery-prev'),
    galleryNext: document.getElementById('gallery-next'),
    modalTitle: document.getElementById('product-modal-title'),
    modalPrice: document.getElementById('product-modal-price'),
    modalShape: document.getElementById('product-modal-shape'),

    modalDesc: document.getElementById('product-modal-description'),
    modalPublicDesc: document.getElementById('product-modal-public-description'),

    modalSpecs: document.getElementById('product-modal-specs'),
    modalAddBtn: document.getElementById('modal-add-btn'),
    modalClose: document.getElementById('modal-close'),
};

let modalProduct = null;
let currentImageIndex = 0;

function initUI(_products, _sceneFunctions) {
    products = _products;
    sceneFunctions = _sceneFunctions;
    
    if (!dom.productGrid) {
        console.error('Product grid not found');
        return;
    }
    if (!dom.checkoutBtn) {
        console.error('Checkout button not found');
        return;
    }
    gsap.to(sceneFunctions.treeGroup.scale, { x: 1.55, y: 1.55, z: 1.55, duration: 0.2, ease: 'power1.out' });
    
    renderProducts();
    initCategoryFilter(); // ← initialize category filter here
    addEventListeners();
    updateCartUI();
}



// --- Event Listeners ---
function addEventListeners() {
    // Checkout
    if (dom.checkoutBtn) {
        dom.checkoutBtn.addEventListener('click', () => {
            renderOrderModal();
            if (dom.orderModal) dom.orderModal.style.display = 'flex';
            if (dom.paperConfirm) dom.paperConfirm.focus();
        });
    }

    // Order Modal
    if (dom.paperCancel) {
        dom.paperCancel.addEventListener('click', () => {
            if (dom.orderModal) dom.orderModal.style.display = 'none';
        });
    }
    if (dom.orderForm) {
        dom.orderForm.addEventListener('submit', handleOrderSubmit);
    }

    // Success Modal
    if (dom.closeSuccessBtn) {
        dom.closeSuccessBtn.addEventListener('click', () => {
            if (dom.successOverlay) dom.successOverlay.style.display = 'none';
        });
    }
    
    // Product Modal
    if (dom.modalClose) {
        dom.modalClose.addEventListener('click', closeProductModal);
    }
    if (dom.productModal) {
        dom.productModal.addEventListener('click', (e) => { 
            if (e.target === dom.productModal) closeProductModal(); 
        });
    }
    if (dom.modalAddBtn) {
        dom.modalAddBtn.addEventListener('click', () => {
            if (!modalProduct) return;
            const card = document.querySelector(`.product-card[data-product-id="${modalProduct.id}"]`);
            handleAdd(modalProduct, card || document.querySelector('.product-card'));
        });
    }
    if (dom.galleryPrev) {
        dom.galleryPrev.addEventListener('click', () => { if (modalProduct) updateGallery(currentImageIndex - 1); });
    }
    if (dom.galleryNext) {
        dom.galleryNext.addEventListener('click', () => { if (modalProduct) updateGallery(currentImageIndex + 1); });
    }

    // Global listeners
    window.addEventListener('keydown', handleGlobalKeys);
    
    // Language change listener
    window.addEventListener('languageChanged', (event) => {
        updateDynamicContent();
    });
    
    // Canvas drag-and-drop
    if (sceneFunctions.renderer && sceneFunctions.renderer.domElement) {
        const canvasContainer = sceneFunctions.renderer.domElement.parentElement;
        if (canvasContainer) {
            canvasContainer.addEventListener('dragover', (e) => { e.preventDefault(); canvasContainer.classList.add('drop-zone-active'); });
            canvasContainer.addEventListener('dragleave', () => canvasContainer.classList.remove('drop-zone-active'));
            canvasContainer.addEventListener('drop', handleDropOnTree);

            // Canvas drag-to-rotate interaction
            let isDragging = false, dragStartX = 0, rotationOnDown = 0;
            sceneFunctions.renderer.domElement.addEventListener('pointerdown', (ev) => {
                if (sceneFunctions.isPointerOnTree(ev.clientX, ev.clientY)) {
                    isDragging = true;
                    dragStartX = ev.clientX;
                    rotationOnDown = sceneFunctions.treeGroup.rotation.y;
                    gsap.to(sceneFunctions.treeGroup.scale, { x: 1.55, y: 1.55, z: 1.55, duration: 0.2, ease: 'power1.out' });
                }
            });
            window.addEventListener('pointermove', (ev) => {
                if (isDragging) {
                    sceneFunctions.treeGroup.rotation.y = rotationOnDown + (ev.clientX - dragStartX) * 0.006;
                }
            });
            window.addEventListener('pointerup', () => {
                if(isDragging) {
                    isDragging = false;
                    gsap.to(sceneFunctions.treeGroup.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.4, ease: 'elastic.out(1,0.6)' });
                }
            });
        }
    }
}

// --- Category Filter ---
const categoryBtns = document.querySelectorAll('.category-btn');
let activeCategory = 'all';

function initCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn'); // move inside
    if (!categoryBtns || categoryBtns.length === 0) return;

    let activeCategory = 'all';

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            renderProducts(activeCategory); // pass category to rendering
        });
    });

    function renderProducts(category = 'all') {
        dom.productGrid.innerHTML = '';
        const filteredProducts = category === 'all'
            ? products
            : products.filter(p => p.category === category);

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.setAttribute('data-product-id', product.id);
            card.setAttribute('draggable', 'true');
            card.innerHTML = `
                <div class="card-top">
                    <img src="${product.images_url_list[0]}" alt="${product.name}" class="product-image" draggable="false">
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">${product.price}  ֏</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <button class="add-btn" aria-label="${window.t ? window.t('product.add.aria', {name: product.name}) : `Add ${product.name} to cart`}"><span class="icon">🎁</span>${window.t ? window.t('product.add') : 'Add to Tree'}</button>
                </div>`;

            card.querySelector('.add-btn').addEventListener('click', e => { e.stopPropagation(); handleAdd(product, card); });
            card.querySelector('.product-image').addEventListener('click', e => { e.stopPropagation(); openProductModal(product); });

            card.addEventListener('dragstart', e => {
                e.dataTransfer.setData('application/json', JSON.stringify(product));
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));

            dom.productGrid.appendChild(card);
        });
    }
}

const grid = document.querySelector('.product-grid');
grid.innerHTML = ''; // clear before filling
// --- Product Rendering & Cart Logic ---

function renderProducts() {
    dom.productGrid.innerHTML = '';

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.dataset.productId = product.id;
            card.draggable = true;
          
            card.innerHTML = `
              <img src="${product.images_url_list[0]}" alt="${product.name}" class="product-image" draggable="false">
              <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}  ֏</div>
              </div>
              <button class="add-btn" aria-label="${window.t ? window.t('product.add.aria', {name: product.name}) : `Add ${product.name} to cart`}">
                🎁 ${window.t ? window.t('product.add') : 'Add'}
              </button>`;
          
            card.querySelector('.add-btn').addEventListener('click', e => {
              e.stopPropagation();
              handleAdd(product, card);
            });
          
            card.querySelector('.product-image').addEventListener('click', e => {
              e.stopPropagation();
              openProductModal(product);
            });
          
            card.addEventListener('dragstart', e => {
              e.dataTransfer.setData('application/json', JSON.stringify(product));
              card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
          
            grid.appendChild(card);
          });
}

function handleAdd(product, cardElement) {
    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ productId: product.id, name: product.name, price: product.price, image: product.images_url_list[0], qty: 1 });
    }
    updateCartUI();
    animateToyToTree(product, cardElement);
    announce(window.t ? window.t('announcement.added', {name: product.name}) : `${product.name} added to the tree`);
}

function handleDropOnTree(e) {
    e.preventDefault();
    sceneFunctions.renderer.domElement.parentElement.classList.remove('drop-zone-active');
    try {
        const product = JSON.parse(e.dataTransfer.getData('application/json'));
        const existing = cart.find(it => it.productId === product.id);
        if (existing) existing.qty += 1;
        else cart.push({ productId: product.id, name: product.name, price: product.price, image: product.images_url_list[0], qty: 1 });
        updateCartUI();
        sceneFunctions.add3DToyToTree(product);
        announce(window.t ? window.t('announcement.added', {name: product.name}) : `${product.name} added to the tree`);
    } catch (err) { console.error('Drop error', err); }
}

function animateToyToTree(product, sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    const canvasRect = sceneFunctions.renderer.domElement.getBoundingClientRect();
    const flyingToy = document.createElement('img');
    flyingToy.src = product.images_url_list[1];
    flyingToy.style.cssText = `position:fixed; left:${rect.left}px; top:${rect.top}px; width:${rect.width * 0.5}px; height:${rect.height * 0.5}px; z-index:1000; pointer-events:none; border-radius:8px;`;
    document.body.appendChild(flyingToy);

    gsap.to(flyingToy, {
        left: canvasRect.left + canvasRect.width / 2,
        top: canvasRect.top + canvasRect.height / 2,
        width: 20,
        height: 20,
        rotation: 360,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
            flyingToy.remove();
            sceneFunctions.add3DToyToTree(product);
        }
    });
}

// --- UI Updates & State ---
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    dom.cartCount.textContent = totalItems;
    dom.checkoutBtn.disabled = totalItems === 0;
    dom.modalItemsCount.textContent = window.t ? window.t('order.items', {count: totalItems}) : `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
}

function announce(msg) {
    dom.announcements.textContent = msg;
    setTimeout(() => dom.announcements.textContent = '', 3000);
}

// Update dynamic content when language changes
function updateDynamicContent() {
    if (!window.t) return;
    
    // Update checkout button text
    if (dom.checkoutBtn && dom.checkoutBtn.querySelector('#checkout-text')) {
        dom.checkoutBtn.querySelector('#checkout-text').textContent = window.t('checkout.button');
    }
    
    // Update cart count badge
    if (dom.cartCount && dom.cartCount.nextElementSibling) {
        dom.cartCount.nextElementSibling.textContent = window.t('cert.badge');
    }
    
    // Update category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        const category = btn.dataset.category;
        if (category) {
            btn.textContent = window.t(`category.${category}`);
        }
    });
    
    // Update modal content if open
    if (dom.orderModal && dom.orderModal.style.display === 'flex') {
        renderOrderModal();
    }
    
    // Update product modal if open
    if (dom.productModal && dom.productModal.style.display === 'flex' && modalProduct) {
        openProductModal(modalProduct);
    }
}

// --- Order Modal Logic ---
function renderOrderModal() {
    dom.orderList.innerHTML = '';
    if (cart.length === 0) {
        dom.orderList.innerHTML = `<div style="text-align:center; padding:18px;">${window.t ? window.t('order.empty') : 'Your letter to Santa is empty!'}</div>`;
    }
    cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'order-row';
        row.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="${item.image}" alt="${item.name}" style="width:40px;height:40px;object-fit:contain">
              <div>
                  <div>${item.name}</div>
                  <div style="font-size:13px;">${item.price.toFixed(2)} ֏</div>
              </div>
            </div>
            <div class="qty-controls">
              <button data-id="${item.productId}" class="qty-decrease" aria-label="${window.t ? window.t('qty.decrease') : 'Decrease quantity'}">-</button>
              <input type="number" min="0" value="${item.qty}" data-id="${item.productId}" aria-label="${window.t ? window.t('qty.label', {name: item.name}) : `Quantity for ${item.name}`}">
              <button data-id="${item.productId}" class="qty-increase" aria-label="${window.t ? window.t('qty.increase') : 'Increase quantity'}">+</button>
            </div>
        `;
        dom.orderList.appendChild(row);
    });
    updateModalTotals();

    // Add event listeners for new controls
    dom.orderList.querySelectorAll('.qty-decrease').forEach(btn => btn.addEventListener('click', e => changeQuantity(Number(e.target.dataset.id), -1)));
    dom.orderList.querySelectorAll('.qty-increase').forEach(btn => btn.addEventListener('click', e => changeQuantity(Number(e.target.dataset.id), 1)));
    dom.orderList.querySelectorAll('input[type="number"]').forEach(input => input.addEventListener('change', e => setQuantity(Number(e.target.dataset.id), parseInt(e.target.value) || 0)));
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.productId === productId);
    if (item) setQuantity(productId, item.qty + delta);
}

function setQuantity(productId, newQty) {
    newQty = Math.max(0, newQty);
    const itemIndex = cart.findIndex(i => i.productId === productId);
    if (itemIndex === -1) return;
    
    const item = cart[itemIndex];
    const diff = newQty - item.qty;

    if (diff > 0) {
        const product = products.find(p => p.id === productId);
        for(let i=0; i<diff; i++) sceneFunctions.add3DToyToTree(product);
    } else if (diff < 0) {
        sceneFunctions.removeToyMeshesFromScene(productId, -diff);
    }

    if (newQty === 0) {
        cart.splice(itemIndex, 1);
    } else {
        item.qty = newQty;
    }

    renderOrderModal();
}

function updateModalTotals() {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    dom.paperTotal.textContent = total.toFixed(2) + ' ֏';
    updateCartUI();
}

async function handleOrderSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) return;

    dom.paperConfirm.disabled = true;
    dom.paperConfirm.textContent = window.t ? window.t('order.sending') : 'Sending...';

    // Animate envelope + elf at the same time
    await Promise.all([
        animateOrderToSanta(dom.orderModal.querySelector('.order-paper-card')),
    ]);

    // ... then send order and show success modal
    const orderData = {
        customer_name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        comment: document.getElementById('santa-message').value,
        items: cart,
    };

    try {
        const result = await sendOrder(orderData);
        dom.successOverlay.style.display = 'flex';
        announce(window.t ? window.t('announcement.order.success') : 'Order successfully sent to Santa!');
        cart = [];
        updateCartUI();
        sceneFunctions.clearAllToysFromScene();
        dom.orderModal.style.display = 'none';
        dom.orderForm.reset();
    } catch (err) {
        alert(window.t ? window.t('error.order.failed') : 'Failed to send order. Please try again.');
        console.error(err);
    } finally {
        dom.paperConfirm.disabled = false;
        dom.paperConfirm.textContent = window.t ? window.t('order.buttons.send') : 'Send to Santa ✨';
    }
}




// --- Product Modal ---
function openProductModal(product) {
    modalProduct = product;
    currentImageIndex = 0;
    dom.productModal.style.display = 'flex';
    dom.modalTitle.textContent = product.name;
    dom.modalPrice.textContent = product.price.toFixed(2) + ' ֏';
    dom.modalShape.textContent = product.shape || '';
    dom.modalDesc.textContent = product.description || '';
    dom.modalPublicDesc.textContent = product.public_description || '';

    const imgs = product.images_url_list;
    dom.galleryThumbs.innerHTML = imgs.map((src, i) => `<img src="${src}" alt="${product.name} thumbnail ${i+1}" data-index="${i}">`).join('');
    dom.galleryThumbs.querySelectorAll('img').forEach(img => img.addEventListener('click', e => updateGallery(Number(e.target.dataset.index))));
    updateGallery(0);

    gsap.fromTo(dom.productModal.querySelector('.paper-card'), { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28 });
}

function closeProductModal() {
    gsap.to(dom.productModal.querySelector('.paper-card'), {
        scale: 0.98, opacity: 0, duration: 0.18, onComplete: () => dom.productModal.style.display = 'none'
    });
}

function updateGallery(index) {
    const imgs = modalProduct.images_url_list
    currentImageIndex = (index + imgs.length) % imgs.length;
    dom.galleryImage.src = imgs[currentImageIndex];
    dom.galleryThumbs.querySelectorAll('img').forEach((img, i) => img.classList.toggle('active', i === currentImageIndex));
}

function handleGlobalKeys(e) {
    if (e.key === 'Escape') {
        if (dom.orderModal.style.display === 'flex') dom.orderModal.style.display = 'none';
        if (dom.successOverlay.style.display === 'flex') dom.successOverlay.style.display = 'none';
        if (dom.productModal.style.display === 'flex') closeProductModal();
    }
     if (dom.productModal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') updateGallery(currentImageIndex - 1);
        if (e.key === 'ArrowRight') updateGallery(currentImageIndex + 1);
    }
}

function animateOrderToSanta(orderCard) {
    return new Promise((resolve) => {
        if (!orderCard) return resolve();

        // Step 1: Clone the card for animation
        const clone = orderCard.cloneNode(true);
        const rect = orderCard.getBoundingClientRect();
        clone.style.position = 'fixed';
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.margin = '0';
        clone.style.zIndex = 9999;
        clone.style.transformOrigin = 'top center';
        clone.style.pointerEvents = 'none';
        clone.style.borderRadius = '16px';
        clone.style.boxShadow = '0 10px 40px rgba(0,0,0,0.25)';
        document.body.appendChild(clone);

        // Create a "flap" overlay for envelope effect
        const flap = document.createElement('div');
        flap.style.position = 'absolute';
        flap.style.top = '0';
        flap.style.left = '0';
        flap.style.width = '100%';
        flap.style.height = '50%';
        flap.style.background = 'rgba(255,250,245,0.9)';
        flap.style.borderBottom = '2px solid #e0c497';
        flap.style.transformOrigin = 'top';
        clone.appendChild(flap);

        const tl = gsap.timeline({ onComplete: () => { clone.remove(); resolve(); } });

        // Step 2: Fold flap down (like envelope closing)
        tl.to(flap, { rotationX: -180, duration: 0.6, ease: 'back.inOut(1.7)' });

        // Step 3: Slight bounce of the envelope
        tl.to(clone, { scale: 0.9, y: -10, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }, "-=0.2");

        // Step 4: Fold the whole card into thin envelope (scaleY)
        tl.to(clone, { scaleY: 0.3, duration: 0.5, ease: 'power1.inOut' });

        // Step 5: Fly to Lapland along a curved path
        const endX = window.innerWidth * 1.2;
        const endY = -window.innerHeight * 0.8;

        tl.to(clone, {
            motionPath: {
                path: [
                    { x: 0, y: 0 },
                    { x: endX * 0.4, y: endY * 0.2 },
                    { x: endX * 0.7, y: endY * 0.5 },
                    { x: endX, y: endY }
                ],
                curviness: 1.2
            },
            rotation: 720,
            scale: 0.2,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut'
        });
    });
}