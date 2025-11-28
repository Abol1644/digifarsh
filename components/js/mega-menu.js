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