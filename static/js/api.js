/**
 * api.js
 * Handles communication with the backend API.
 */

// This function simulates sending an order to a backend.
// Replace the URL with your actual API endpoint.
async function sendOrder(orderData) {
    console.log('--- Sending Order to Santa ---');
    console.log(orderData);

    // To use a real backend, uncomment the fetch block and update the URL.

    try {
        const response = await fetch("${BASE_URL}/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.error || 'Server error');
        }

        return await response.json();

    } catch (err) {
        console.error("API Error:", err);
        throw err; // Re-throw to be caught by the UI handler
    }
    

    // For now, we'll use a mock API that always succeeds after a delay.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ 
                success: true, 
                order_id: `SANTA-${Date.now()}` 
            });
        }, 1200);
    });
}