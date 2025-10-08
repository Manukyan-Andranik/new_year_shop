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
    modalDesc: document.getElementById('product-modal-description'),
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
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-short">${product.description || ''}</div>
                    </div>
                </div>
                <div class="card-bottom">
                    <button class="add-btn" aria-label="Add ${product.name} to cart"><span class="icon">🎁</span>Add to Tree</button>
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
                <div class="product-price">$${product.price.toFixed(2)}</div>
              </div>
              <button class="add-btn" aria-label="Add ${product.name} to cart">
                🎁 Add
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
    announce(`${product.name} added to the tree`);
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
        announce(`${product.name} added to the tree`);
    } catch (err) { console.error('Drop error', err); }
}

function animateToyToTree(product, sourceElement) {
    const rect = sourceElement.getBoundingClientRect();
    const canvasRect = sceneFunctions.renderer.domElement.getBoundingClientRect();
    const flyingToy = document.createElement('img');
    flyingToy.src = product.images_url_list[0];
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
    dom.modalItemsCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
}

function announce(msg) {
    dom.announcements.textContent = msg;
    setTimeout(() => dom.announcements.textContent = '', 3000);
}

// --- Order Modal Logic ---
function renderOrderModal() {
    dom.orderList.innerHTML = '';
    if (cart.length === 0) {
        dom.orderList.innerHTML = `<div style="text-align:center; padding:18px;">Your letter to Santa is empty!</div>`;
    }
    cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'order-row';
        row.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="${item.image}" alt="${item.name}" style="width:40px;height:40px;object-fit:contain">
              <div>
                  <div>${item.name}</div>
                  <div style="font-size:13px;">$${item.price.toFixed(2)}</div>
              </div>
            </div>
            <div class="qty-controls">
              <button data-id="${item.productId}" class="qty-decrease" aria-label="Decrease quantity">-</button>
              <input type="number" min="0" value="${item.qty}" data-id="${item.productId}" aria-label="Quantity for ${item.name}">
              <button data-id="${item.productId}" class="qty-increase" aria-label="Increase quantity">+</button>
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
    dom.paperTotal.textContent = '$' + total.toFixed(2);
    updateCartUI();
}

async function handleOrderSubmit(event) {
    event.preventDefault();
    if (cart.length === 0) return;

    dom.paperConfirm.disabled = true;
    dom.paperConfirm.textContent = 'Sending...';

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
        announce('Order successfully sent to Santa!');
        cart = [];
        updateCartUI();
        sceneFunctions.clearAllToysFromScene();
        dom.orderModal.style.display = 'none';
        dom.orderForm.reset();
    } catch (err) {
        alert('Failed to send order. Please try again.');
        console.error(err);
    } finally {
        dom.paperConfirm.disabled = false;
        dom.paperConfirm.textContent = 'Send to Santa ✨';
    }
}




// --- Product Modal ---
function openProductModal(product) {
    modalProduct = product;
    currentImageIndex = 0;
    dom.productModal.style.display = 'flex';
    dom.modalTitle.textContent = product.name;
    dom.modalPrice.textContent = '$' + product.price.toFixed(2);
    dom.modalDesc.textContent = product.description || '';
    dom.modalSpecs.innerHTML = '';
    if (product.details) {
        dom.modalSpecs.innerHTML = Object.entries(product.details)
            .map(([k, v]) => `<div><strong>${k}:</strong> ${v}</div>`).join('');
    }

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

        // Hide original order modal immediately
        const orderModal = orderCard.closest('.modal-overlay');
        if (orderModal) orderModal.style.display = 'none';

        // Clone the card for animation
        const clone = orderCard.cloneNode(true);
        const rect = orderCard.getBoundingClientRect();
        
        // Center the clone on screen
        const centerX = window.innerWidth / 2 - rect.width / 2;
        const centerY = window.innerHeight / 2 - rect.height / 2;
        
        clone.style.position = 'fixed';
        clone.style.left = centerX + 'px';
        clone.style.top = centerY + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.margin = '0';
        clone.style.zIndex = 9999;
        clone.style.transformOrigin = 'center center';
        clone.style.pointerEvents = 'none';
        clone.style.overflow = 'hidden';
        document.body.appendChild(clone);

        // Create magical sparkles container
        const sparklesContainer = document.createElement('div');
        sparklesContainer.style.position = 'fixed';
        sparklesContainer.style.top = '0';
        sparklesContainer.style.left = '0';
        sparklesContainer.style.width = '100%';
        sparklesContainer.style.height = '100%';
        sparklesContainer.style.pointerEvents = 'none';
        sparklesContainer.style.zIndex = 9998;
        document.body.appendChild(sparklesContainer);

        // Create sparkles centered around the card
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = ['✨', '⭐', '🌟', '💫', '❄️'][Math.floor(Math.random() * 5)];
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = Math.random() * 20 + 15 + 'px';
            sparkle.style.left = window.innerWidth / 2 + 'px';
            sparkle.style.top = window.innerHeight / 2 + 'px';
            sparkle.style.opacity = '0';
            sparklesContainer.appendChild(sparkle);
        }

        // Create envelope overlay
        const envelope = document.createElement('div');
        envelope.style.position = 'absolute';
        envelope.style.top = '0';
        envelope.style.left = '0';
        envelope.style.width = '100%';
        envelope.style.height = '100%';
        envelope.style.background = 'linear-gradient(180deg, #f9ebe0 0%, #fff5e8 100%)';
        envelope.style.border = '3px solid #d4af37';
        envelope.style.borderRadius = '16px';
        envelope.style.opacity = '0';
        envelope.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.3)';
        clone.appendChild(envelope);

        // Create envelope flap
        const flap = document.createElement('div');
        flap.style.position = 'absolute';
        flap.style.top = '0';
        flap.style.left = '0';
        flap.style.width = '100%';
        flap.style.height = '52%';
        flap.style.background = 'linear-gradient(165deg, #fff 0%, #ffe8d6 100%)';
        flap.style.borderBottom = '3px solid #d4af37';
        flap.style.transformOrigin = 'top center';
        flap.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%)';
        flap.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        envelope.appendChild(flap);

        // Create wax seal
        const seal = document.createElement('div');
        seal.innerHTML = '🎅';
        seal.style.position = 'absolute';
        seal.style.top = '48%';
        seal.style.left = '50%';
        seal.style.transform = 'translate(-50%, -50%)';
        seal.style.fontSize = '48px';
        seal.style.opacity = '0';
        seal.style.filter = 'drop-shadow(0 4px 8px rgba(184, 50, 50, 0.4))';
        envelope.appendChild(seal);

        // Create sleigh with Santa
        const sleigh = document.createElement('div');
        sleigh.innerHTML = '🛷🎅🦌';
        sleigh.style.position = 'fixed';
        sleigh.style.fontSize = '60px';
        sleigh.style.opacity = '0';
        sleigh.style.zIndex = 10000;
        sleigh.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))';
        document.body.appendChild(sleigh);

        // Create snow trail
        const snowTrail = document.createElement('div');
        snowTrail.style.position = 'fixed';
        snowTrail.style.pointerEvents = 'none';
        snowTrail.style.zIndex = 9997;
        document.body.appendChild(snowTrail);

        const tl = gsap.timeline({ 
            onComplete: () => { 
                clone.remove(); 
                sparklesContainer.remove();
                sleigh.remove();
                snowTrail.remove();
                resolve(); 
            } 
        });

        // Step 1: Sparkle burst around the card
        tl.to(sparklesContainer.children, {
            opacity: 1,
            x: () => (Math.random() - 0.5) * 300,
            y: () => (Math.random() - 0.5) * 300,
            rotation: () => Math.random() * 360,
            scale: () => Math.random() * 1.5 + 0.5,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power2.out'
        });

        // Step 2: Card glow and slight scale
        tl.to(clone, {
            scale: 1.05,
            boxShadow: '0 0 60px rgba(255, 215, 0, 0.6), 0 0 100px rgba(255, 215, 0, 0.4)',
            duration: 0.5,
            ease: 'power2.inOut'
        }, '-=0.6');

        // Step 3: Envelope appears and wraps the card
        tl.to(envelope, { opacity: 1, duration: 0.3 }, '-=0.2');
        tl.to(clone.querySelectorAll('.paper-header, .order-list, .paper-footer'), {
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            stagger: 0.05
        });

        // Step 4: Flap closes with bounce
        tl.to(flap, {
            rotationX: -180,
            duration: 0.7,
            ease: 'back.out(1.7)'
        });

        // Step 5: Seal appears with pop
        tl.fromTo(seal, 
            { scale: 0, rotation: -180 },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0,
                duration: 0.5,
                ease: 'back.out(2)'
            }
        );

        // Step 6: Envelope folds into compact size
        tl.to(clone, {
            scaleY: 0.25,
            scaleX: 0.85,
            borderRadius: '8px',
            duration: 0.6,
            ease: 'power2.inOut'
        });

        // Step 7: Sparkles fade and move with envelope
        tl.to(sparklesContainer.children, {
            opacity: 0,
            y: '-=100',
            duration: 0.5
        }, '-=0.3');

        // Step 8: Santa's sleigh arrives (centered on screen)
        const sleighStartX = window.innerWidth / 2 - 200;
        const sleighStartY = window.innerHeight / 2;
        const sleighEndX = window.innerWidth / 2 - 90;
        
        tl.set(sleigh, { x: sleighStartX, y: sleighStartY, opacity: 0 });
        tl.to(sleigh, {
            x: sleighEndX,
            y: sleighStartY,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        });

        // Step 9: Envelope jumps onto sleigh
        tl.to(clone, {
            x: '+=20',
            y: '-=10',
            scale: 0.15,
            rotation: 15,
            duration: 0.5,
            ease: 'power2.inOut'
        }, '-=0.2');

        // Step 10: Journey to North Pole with snow trail
        const journeyEndX = window.innerWidth + 200;
        const journeyEndY = -window.innerHeight * 0.5;
        
        // Animate snow trail
        for (let i = 0; i < 20; i++) {
            const snowflake = document.createElement('div');
            snowflake.innerHTML = '❄️';
            snowflake.style.position = 'absolute';
            snowflake.style.fontSize = Math.random() * 15 + 10 + 'px';
            snowflake.style.opacity = '0';
            snowTrail.appendChild(snowflake);
        }

        tl.to([clone, sleigh], {
            motionPath: {
                path: [
                    { x: 0, y: 0 },
                    { x: journeyEndX * 0.3, y: journeyEndY * 0.3 },
                    { x: journeyEndX * 0.6, y: journeyEndY * 0.6 },
                    { x: journeyEndX, y: journeyEndY }
                ],
                curviness: 1.5
            },
            duration: 2,
            ease: 'power1.inOut',
            onUpdate: function() {
                // Leave snow trail
                if (Math.random() > 0.7) {
                    const snowflake = snowTrail.children[Math.floor(Math.random() * snowTrail.children.length)];
                    if (snowflake) {
                        const sleighRect = sleigh.getBoundingClientRect();
                        gsap.set(snowflake, {
                            x: sleighRect.left + 30,
                            y: sleighRect.top + 20,
                            opacity: 1
                        });
                        gsap.to(snowflake, {
                            y: '+=100',
                            opacity: 0,
                            duration: 1,
                            ease: 'power1.out'
                        });
                    }
                }
            }
        });

        // Step 11: Final fade with twinkle
        tl.to([clone, sleigh], {
            opacity: 0,
            scale: 0.1,
            duration: 0.5,
            ease: 'power2.in'
        }, '-=0.5');
    });
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