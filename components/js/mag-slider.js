document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all slider wrappers on the page
    const allSliders = document.querySelectorAll('.product-slider-wrapper');

    allSliders.forEach(wrapper => {
        const track = wrapper.querySelector('.product-scroll-track');
        const nextBtn = wrapper.querySelector('.nav-btn-left');
        const prevBtn = wrapper.querySelector('.nav-btn-right');

        // Safety check
        if (!track || !nextBtn || !prevBtn) return;

        // Function to calculate the exact width of one card + gap
        const getScrollAmount = () => {
            const firstCard = track.firstElementChild;
            if (!firstCard) return 300; // Fallback

            // Get the card width
            const cardWidth = firstCard.offsetWidth;
            
            // Get the gap (using computed style)
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 16; // Default to 16px if 0

            return cardWidth + gap;
        };

        // --- BUTTON LOGIC ---
        nextBtn.addEventListener('click', () => {
            // Scroll "Next" (Left visually in RTL)
            // We use negative value for RTL scrolling in most modern browsers
            const amount = getScrollAmount();
            track.scrollBy({ left: -amount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            // Scroll "Prev" (Right visually in RTL)
            const amount = getScrollAmount();
            track.scrollBy({ left: amount, behavior: 'smooth' });
        });

        // --- TOUCH LOGIC ---
        // Note: CSS 'overflow-x: auto' handles native touch swiping on mobile perfectly.
        // However, if you want "Grab and Drag" with a MOUSE on desktop, use this:
        
        let isDown = false;
        let startX;
        let scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            wrapper.classList.add('active'); // Optional: change cursor
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.style.cursor = 'grabbing';
            track.style.userSelect = 'none'; // Prevent text selection
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
            track.style.removeProperty('user-select');
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
            track.style.removeProperty('user-select');
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // *2 for faster scrolling
            track.scrollLeft = scrollLeft - walk;
        });
    });
});