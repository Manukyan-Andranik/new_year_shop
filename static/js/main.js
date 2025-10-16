// Detect base URL from current page location
// If the page is loaded from /mandarin/, use that as base
const BASE_URL = (() => {
    const path = window.location.pathname;
    if (path.startsWith('/mandarin')) {
        return '/mandarin';
    }
    return '';
})();

async function main(products) {
    if (window.christmasShopInitialized) {
        console.warn('Application already initialized, skipping...');
        return;
    }
    
    try {
        const canvasContainer = document.getElementById('canvas-container');
        if (!canvasContainer) throw new Error('Canvas container not found');

        const existingCanvas = canvasContainer.querySelector('canvas');
        if (existingCanvas) existingCanvas.remove();

        const sceneFunctions = initScene(canvasContainer);

        // Determine type from URL
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type') || 'all';
        const currentLang = window.translationManager ? window.translationManager.currentLanguage : 'en';

        const apiUrl = `${BASE_URL}/api/products?lang=${currentLang}&type=${encodeURIComponent(type)}`;
        console.log('Fetching from:', apiUrl); // Debug log
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const productsData = await response.json();

        console.log('Products loaded:', productsData.length); // Debug log

        initUI(productsData, sceneFunctions);
        window.christmasShopInitialized = true;

    } catch (error) {
        console.error("Failed to initialize the application:", error);
        const errorContainer = document.getElementById('canvas-container') || document.body;
        errorContainer.innerHTML = `<div style="text-align:center; padding: 40px; font-size:1.2em;">
            <h2>${window.t ? window.t('error.loading') : 'Oh no! 😔'}</h2>
            <p>${window.t ? window.t('error.loading.message') : 'Something went wrong while loading the shop. Please try again later.'}</p>
            <p style="color: #666; font-size: 0.9em;">Error: ${error.message}</p>
        </div>`;
    }
}

// Run the application when DOM is loaded
document.addEventListener('DOMContentLoaded', main);