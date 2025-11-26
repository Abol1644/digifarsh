/* components/js/offers-slider.js */

document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('offers-list');
    const scrollBtn = document.getElementById('offer-scroll-btn');

    if (scrollContainer && scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            // Determine scroll amount (card width + gap)
            // Roughly 240px card + 16px gap = 256px
            const scrollAmount = 260; 

            // scrollBy scrolls relative to current position
            // Negative value scrolls Left (which reveals more content in RTL layouts depending on browser)
            // In pure RTL mode, sometimes scrolling negative X moves visual left.
            
            // NOTE: In many browsers, RTL scrollLeft is negative. 
            // To go "Next" (visually left), we subtract.
            scrollContainer.scrollBy({
                left: -scrollAmount, 
                behavior: 'smooth'
            });
        });
    }
});