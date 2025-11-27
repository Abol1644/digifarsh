document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('simple-scroll-track');
    const nextBtn = document.getElementById('simple-slider-prev-btn');
    const prevBtn = document.getElementById('simple-slider-next-btn');

    if (track && nextBtn && prevBtn) {
        
        nextBtn.addEventListener('click', () => {
            // Scroll Right (technically negative in RTL visual, but positive scrollLeft value in standard implementation)
            // We scroll -280 to move "Left" visually (next items)
            track.scrollBy({ left: -280, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            // Scroll Left (technically positive in RTL visual)
            track.scrollBy({ left: 280, behavior: 'smooth' });
        });
    }
});