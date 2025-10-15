BASE_URL = "";
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

        const response = await fetch(`${BASE_URL}/api/products?lang=${currentLang}&type=${encodeURIComponent(type)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const productsData = await response.json();

        initUI(productsData, sceneFunctions);
        window.christmasShopInitialized = true;

    } catch (error) {
        console.error("Failed to initialize the application:", error);
        document.body.innerHTML = `<div style="text-align:center; padding: 40px; font-size:1.2em;">
            <h2>${window.t ? window.t('error.loading') : 'Oh no! 😔'}</h2>
            <p>${window.t ? window.t('error.loading.message') : 'Something went wrong while loading the shop. Please try again later.'}</p>
        </div>`;
    }
}


// Run the application when DOM is loaded
document.addEventListener('DOMContentLoaded', main);