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

// story-slider.js

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('story-scroll');
  const prevBtn   = document.querySelector('#story-slider .prev-btn');
  const nextBtn   = document.querySelector('#story-slider .next-btn');

  if (!container || !prevBtn || !nextBtn) return;

  const SCROLL_STEP = 220; // مقدار اسکرول هر بار (px)

  prevBtn.addEventListener('click', function () {
    container.scrollBy({
      left: -SCROLL_STEP,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', function () {
    container.scrollBy({
      left: SCROLL_STEP,
      behavior: 'smooth'
    });
  });
});

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

/* components/js/mega-menu.js */

document.addEventListener('DOMContentLoaded', () => {
    const menuWrapper = document.querySelector('.category-menu-wrapper');
    const categoryBtn = document.querySelector('.category-btn');
    const megaMenu = document.querySelector('.mega-menu');
    // Select the new overlay
    const overlay = document.querySelector('.menu-overlay');

    if (menuWrapper && categoryBtn && megaMenu && overlay) {
        
        // --- Helper Functions to keep code clean ---
        let closeTimer = null;
        const CLOSE_DELAY = 150; // ms delay for mouseleave close

        const clearCloseTimer = () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
        };

        const openMenu = () => {
            clearCloseTimer();
            megaMenu.classList.add('menu-open');
            overlay.classList.add('active');
        };

        const closeMenu = () => {
            clearCloseTimer();
            megaMenu.classList.remove('menu-open');
            overlay.classList.remove('active');
        };

        const toggleMenu = () => {
            if (megaMenu.classList.contains('menu-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        };

        // --- 1. HOVER LOGIC ---
        menuWrapper.addEventListener('mouseenter', () => {
            // cancel any pending close and open immediately
            clearCloseTimer();
            openMenu();
        });

        menuWrapper.addEventListener('mouseleave', () => {
            // start a delayed close, cancelable if the user re-enters
            clearCloseTimer();
            closeTimer = setTimeout(() => {
                closeMenu();
                closeTimer = null;
            }, CLOSE_DELAY);
        });

        // --- 2. CLICK LOGIC ---
        categoryBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        megaMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close when clicking the overlay itself
        overlay.addEventListener('click', closeMenu);

        // Close when clicking anywhere else (Safety net)
        // document.addEventListener('click', () => {
        //     if (megaMenu.classList.contains('menu-open')) {
        //         closeMenu();
        //     }
        // });
    }
});

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

// hero-carousel.js
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  const dots   = Array.from(carousel.querySelectorAll('.hero-dot'));
  const prev   = carousel.querySelector('.hero-nav-prev');
  const next   = carousel.querySelector('.hero-nav-next');

  if (!slides.length) return;

  let current = 0;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });

    dots.forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  prev?.addEventListener('click', () => goToSlide(current - 1));
  next?.addEventListener('click', () => goToSlide(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // اختیاری: اتوپلی
  setInterval(() => goToSlide(current + 1), 8000);
});
