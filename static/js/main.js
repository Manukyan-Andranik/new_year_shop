/**
 * main.js
 * The main entry point for the application.
 * It fetches initial data and initializes the scene and UI modules.
 */

async function main(products) {
    if (window.christmasShopInitialized) {
        console.warn('Application already initialized, skipping...');
        return;
    }
    
    try {
        // 1. Initialize the 3D Scene
        const canvasContainer = document.getElementById('canvas-container');
        if (!canvasContainer) {
            throw new Error('Canvas container not found');
        }
        
        // Clear any existing canvas elements
        const existingCanvas = canvasContainer.querySelector('canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        const sceneFunctions = initScene(canvasContainer);

        // 2. Fetch product data
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const products = await response.json();


        // 3. Initialize the UI with the data and scene functions
        initUI(products, sceneFunctions);
        
        window.christmasShopInitialized = true;
        console.log('Application initialized successfully');

    } catch (error) {
        console.error("Failed to initialize the application:", error);
        document.body.innerHTML = `<div style="text-align:center; padding: 40px; font-size:1.2em;">
            <h2>Oh no! 😔</h2>
            <p>Something went wrong while loading the toy workshop. Please try again later.</p>
        </div>`;
    }
}

// Run the application when DOM is loaded
document.addEventListener('DOMContentLoaded', main);