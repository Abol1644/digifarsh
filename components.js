document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById("offers-list");
  const scrollBtn = document.getElementById("offer-scroll-btn");

  if (!scrollContainer) return;

  // --- 1. Button Logic (Click to Scroll) ---
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      // Card width (approx 170px mobile / 240px desktop) + Gap
      // We calculate it dynamically based on the first card to be safe
      const card = scrollContainer.querySelector(".offer-card");
      const cardWidth = card ? card.offsetWidth + 16 : 260; // 16 is gap

      const direction = getComputedStyle(document.body).direction;

      // In RTL mode, "Next" usually means moving visually to the Left (negative scroll)
      // However, scrollBy logic depends on browser.
      // Simplest way for RTL: Positive value moves LEFT in most modern browsers with dir="rtl"
      const scrollAmount = direction === "rtl" ? -cardWidth : cardWidth;

      scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }

  // --- 2. Desktop Drag-to-Scroll Logic ---
  // We only want this active if the user is using a MOUSE.
  // Mobile users should use native CSS scrolling (better performance).

  let isDown = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    scrollContainer.classList.add("active");

    // Calculate start position
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;

    // Disable smooth scroll while dragging (causes lag if left on)
    scrollContainer.style.scrollBehavior = "auto";
  });

  scrollContainer.addEventListener("mouseleave", () => {
    isDown = false;
    scrollContainer.classList.remove("active");
    scrollContainer.style.scrollBehavior = "smooth";
  });

  scrollContainer.addEventListener("mouseup", () => {
    isDown = false;
    scrollContainer.classList.remove("active");
    scrollContainer.style.scrollBehavior = "smooth";
  });

  scrollContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - scrollContainer.offsetLeft;
    // RTL MATH FIX:
    // In LTR: (x - startX) gives how much we moved right. We subtract that from scrollLeft.
    // In RTL: The logic often needs to be inverted depending on browser implementation.
    // However, the standard calculation usually works if scrollLeft is handled correctly.

    const walk = (x - startX) * 2; // Speed multiplier
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
});

// story-slider.js

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("story-scroll");
  const prevBtn = document.querySelector("#story-slider .prev-btn");
  const nextBtn = document.querySelector("#story-slider .next-btn");

  if (!container || !prevBtn || !nextBtn) return;

  const SCROLL_STEP = 220; // مقدار اسکرول هر بار (px)

  prevBtn.addEventListener("click", function () {
    container.scrollBy({
      left: -SCROLL_STEP,
      behavior: "smooth",
    });
  });

  nextBtn.addEventListener("click", function () {
    container.scrollBy({
      left: SCROLL_STEP,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("simple-scroll-track");
  const nextBtn = document.getElementById("simple-slider-prev-btn");
  const prevBtn = document.getElementById("simple-slider-next-btn");

  if (track && nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      // Scroll Right (technically negative in RTL visual, but positive scrollLeft value in standard implementation)
      // We scroll -280 to move "Left" visually (next items)
      track.scrollBy({ left: -280, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      // Scroll Left (technically positive in RTL visual)
      track.scrollBy({ left: 280, behavior: "smooth" });
    });
  }
});

/* components/js/mega-menu.js */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Header & Menu Toggles
  const menuBtn = document.querySelector(".mobile-menu-trigger");
  const megaMenu = document.querySelector(".mega-menu");
  const openState = document.querySelector(".menu-state-open");
  const closeState = document.querySelector(".menu-state-close");
  const body = document.body;

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      // Toggle Menu Class
      megaMenu.classList.toggle("menu-open");

      // Toggle Button State (Menu Icon vs Close Icon)
      const isOpen = megaMenu.classList.contains("menu-open");
      if (isOpen) {
        openState.style.display = "none";
        closeState.style.display = "flex";
        body.style.overflow = "hidden"; // Prevent background scrolling
      } else {
        openState.style.display = "flex";
        closeState.style.display = "none";
        body.style.overflow = "";
      }
    });
  }

  // 2. Mobile Accordion Logic (Left Side)
  const accordionTitles = document.querySelectorAll(".mega-col-title");

  accordionTitles.forEach((title) => {
    title.addEventListener("click", () => {
      // Only run on mobile
      if (window.innerWidth <= 992) {
        const parent = title.parentElement; // .mega-col

        // Toggle active class
        parent.classList.toggle("accordion-active");
      }
    });
  });

  // 3. Tab Switching Logic (Right Sidebar)
  const sidebarLinks = document.querySelectorAll(".mega-sidebar-list li");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent jump

      // Remove active from all
      sidebarLinks.forEach((l) => l.classList.remove("active"));

      // Add active to clicked
      link.classList.add("active");

      // Logic to switch content (Optional: If you have different content divs)
      // For now, it just highlights the tab as per visual design
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Select all slider wrappers on the page
  const allSliders = document.querySelectorAll(".product-slider-wrapper");

  allSliders.forEach((wrapper) => {
    const track = wrapper.querySelector(".product-scroll-track");
    const nextBtn = wrapper.querySelector(".nav-btn-left");
    const prevBtn = wrapper.querySelector(".nav-btn-right");

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
    nextBtn.addEventListener("click", () => {
      // Scroll "Next" (Left visually in RTL)
      // We use negative value for RTL scrolling in most modern browsers
      const amount = getScrollAmount();
      track.scrollBy({ left: -amount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      // Scroll "Prev" (Right visually in RTL)
      const amount = getScrollAmount();
      track.scrollBy({ left: amount, behavior: "smooth" });
    });

    // --- TOUCH LOGIC ---
    // Note: CSS 'overflow-x: auto' handles native touch swiping on mobile perfectly.
    // However, if you want "Grab and Drag" with a MOUSE on desktop, use this:

    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      wrapper.classList.add("active"); // Optional: change cursor
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = "grabbing";
      track.style.userSelect = "none"; // Prevent text selection
    });

    track.addEventListener("mouseleave", () => {
      isDown = false;
      track.style.cursor = "grab";
      track.style.removeProperty("user-select");
    });

    track.addEventListener("mouseup", () => {
      isDown = false;
      track.style.cursor = "grab";
      track.style.removeProperty("user-select");
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2; // *2 for faster scrolling
      track.scrollLeft = scrollLeft - walk;
    });
  });
});

// hero-carousel.js
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("hero-carousel");
  // Safety check: if carousel doesn't exist, stop.
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
  const dots = Array.from(carousel.querySelectorAll(".hero-dot"));
  const prevBtn = carousel.querySelector(".hero-nav-prev");
  const nextBtn = carousel.querySelector(".hero-nav-next");

  if (!slides.length) return;

  let current = 0;
  let autoPlayInterval;

  // Touch variables
  let touchStartX = 0;
  let touchEndX = 0;

  // --- Core Navigation Function ---
  function goToSlide(index) {
    // Wrap around index
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    current = index;

    // Update Slides
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
      slide.setAttribute("aria-hidden", i !== current);
    });

    // Update Dots
    dots.forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  // --- Event Listeners (Click) ---
  nextBtn?.addEventListener("click", () => {
    goToSlide(current + 1);
    resetAutoPlay();
  });

  prevBtn?.addEventListener("click", () => {
    goToSlide(current - 1);
    resetAutoPlay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToSlide(i);
      resetAutoPlay();
    });
  });

  // --- Touch / Swipe Logic (CORRECTED) ---

  carousel.addEventListener(
    "touchstart",
    (e) => {
      // Record where the finger landed
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay(); // Pause timer while user interacts
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (e) => {
      // Record where the finger lifted
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
      startAutoPlay(); // Resume timer
    },
    { passive: true }
  );

  function handleGesture() {
    // Calculate the difference
    const diff = touchEndX - touchStartX;
    const threshold = 50; // Min swipe distance in pixels

    // Math.abs turns negative numbers positive so we can check magnitude
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped Right (Finger moved Left -> Right) => Show Previous
        goToSlide(current - 1);
      } else {
        // Swiped Left (Finger moved Right -> Left) => Show Next
        goToSlide(current + 1);
      }
    }
  }

  // --- Auto Play Logic ---
  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing timer first
    autoPlayInterval = setInterval(() => goToSlide(current + 1), 6000);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pause on mouse hover (Desktop UX)
  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  // Initialize
  startAutoPlay();
});

// footer accordion.js

document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".footer-col-title");

  titles.forEach((title) => {
    title.addEventListener("click", function () {
      // فقط در حالت موبایل اجرا شود
      if (window.innerWidth <= 992) {
        const parent = this.parentElement;

        // بستن بقیه (اختیاری - اگر می‌خواهید فقط یکی باز باشد)
        /*
                        document.querySelectorAll('.footer-col').forEach(col => {
                            if (col !== parent) col.classList.remove('active');
                        });
                        */

        // تغییر وضعیت آیتم کلیک شده
        parent.classList.toggle("active");
      }
    });
  });
});
