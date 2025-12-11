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
  // 1. Toggle Mobile Drawer (Connect to your existing header button)
  const menuBtn = document.querySelector("#mobile-menu-btn"); // Your header button ID
  const drawer = document.querySelector("#mobileMegaMenu");
  const desktopSideItems = document.querySelectorAll(".mega-sidebar-list li");
  const desktopPanes = document.querySelectorAll(".mega-content-pane");
  const body = document.body;

  desktopSideItems.forEach((item) => {
    // Use 'mouseenter' for desktop so user doesn't have to click
    item.addEventListener("mouseenter", function () {
      // 1. Remove active class from all sidebar items & content panes
      desktopSideItems.forEach((i) => i.classList.remove("active"));
      desktopPanes.forEach((pane) => pane.classList.remove("active"));

      // 2. Activate the hovered item
      this.classList.add("active");

      // 3. Show the corresponding content pane
      const targetId = this.getAttribute("data-target"); // We will add this to HTML
      const targetPane = document.getElementById(targetId);

      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      drawer.classList.toggle("active");

      // Update the icon inside the button (Menu vs Close)
      const openState = menuBtn.querySelector(".menu-state-open");
      const closeState = menuBtn.querySelector(".menu-state-close");

      if (drawer.classList.contains("active")) {
        if (openState) openState.style.display = "none";
        if (closeState) closeState.style.display = "flex";
        body.style.overflow = "hidden"; // Prevent background scroll
      } else {
        if (openState) openState.style.display = "flex";
        if (closeState) closeState.style.display = "none";
        body.style.overflow = "";
      }
    });
  }

  // 2. Sidebar Tab Switching
  const sideItems = document.querySelectorAll(".side-item");
  const tabPanes = document.querySelectorAll(".mobile-tab-pane");
  const desktopMenuBtn = document.querySelector(".category-btn");
  const desktopMegaMenu = document.querySelector(".mega-menu");
  const desktopWrapper = document.querySelector(".category-menu-wrapper");

  if (desktopMenuBtn && desktopMegaMenu) {
    desktopMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop click from bubbling to document
      desktopMenuBtn.classList.toggle("active");
      desktopMegaMenu.classList.toggle("menu-open");
    });

    // Close when clicking anywhere outside
    document.addEventListener("click", (e) => {
      if (!desktopWrapper.contains(e.target)) {
        desktopMenuBtn.classList.remove("active");
        desktopMegaMenu.classList.remove("menu-open");
      }
    });
  }

  sideItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active from all sidebar items
      sideItems.forEach((i) => i.classList.remove("active"));
      // Add active to clicked
      this.classList.add("active");

      // Hide all panes
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Show target pane
      const targetId = this.getAttribute("data-target");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  // 3. Accordion Logic
  const accordionHeaders = document.querySelectorAll(
    ".mobile-accordion .accordion-header"
  );

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const parent = this.parentElement;
      // Toggle current
      parent.classList.toggle("open");
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

document.addEventListener("DOMContentLoaded", () => {
  // --- Auth Modal Logic ---
  const modal = document.getElementById("auth-modal");
  const loginBtns = document.querySelectorAll(".header-login-btn"); // Selects all login buttons (mobile/desktop)
  const closeBtn = document.getElementById("auth-close-btn");
  const tabs = document.querySelectorAll(".auth-tab");
  const forms = document.querySelectorAll(".auth-form");

  if (modal) {
    // 1. Open Modal
    loginBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      });
    });

    // 2. Close Modal
    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Close when clicking outside the box
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // 3. Tab Switching
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs & forms
        tabs.forEach((t) => t.classList.remove("active"));
        forms.forEach((f) => f.classList.remove("active"));

        // Add active class to clicked tab
        tab.classList.add("active");

        // Show corresponding form
        const targetId = tab.getAttribute("data-target");
        document.getElementById(targetId).classList.add("active");
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-toggle-btn");
  const cartDropdown = document.getElementById("cart-dropdown");
  const closeCartBtn = document.getElementById("cart-close-popup");

  if (cartBtn && cartDropdown) {
    // Open/Close on Button Click
    cartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      cartDropdown.classList.toggle("active");
    });

    // Close on X Button
    if (closeCartBtn) {
      closeCartBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        cartDropdown.classList.remove("active");
      });
    }

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
        cartDropdown.classList.remove("active");
      }
    });

    // Optional: Stop closing when clicking INSIDE the dropdown
    cartDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------------------
  // 1. Data Structure (NEW: Grouped by User)
  // -----------------------------------------
  const storyGroups = [
    {
      userId: "user_digifarsh",
      username: "دیجی‌فرش",
      userImg: "./assets/images/logo-main.png",
      items: [
        {
          type: "image",
          src: "./assets/images/story-thumbnail-1.jpg",
          time: "2ساعت پیش",
          duration: 5000,
        },
        {
          type: "video",
          src: "https://www.w3schools.com/html/mov_bbb.mp4",
          time: "3ساعت پیش",
          duration: 10000,
        },
      ],
    },
    {
      userId: "user_festival",
      username: "جشنواره_بهاره",
      userImg: "./assets/images/brands/patris.png", // مثال
      items: [
        {
          type: "image",
          src: "./assets/images/story-thumbnail-2.jpg",
          time: "جدید",
          duration: 4000,
        },
        {
          type: "image",
          src: "./assets/images/story-thumbnail-3.jpg",
          time: "10دقیقه پیش",
          duration: 4000,
        },
      ],
    },
    {
      userId: "user_support",
      username: "پشتیبانی",
      userImg: "./assets/images/support.png",
      items: [
        {
          type: "image",
          src: "./assets/images/category-puzzle/category-puzzle-moroccan-1.png",
          time: "1ساعت پیش",
          duration: 5000,
        },
      ],
    },
  ];

  // -----------------------------------------
  // 2. Elements & State
  // -----------------------------------------
  // (با فرض اینکه دکمه‌های استوری در صفحه اصلی به ترتیب گروه‌ها هستند)
  const storyThumbnails = document.querySelectorAll(".story-item");

  const viewer = document.getElementById("story-viewer");
  const contentWrapper = document.querySelector(".story-viewer-content");
  const closeBtn = document.getElementById("story-close-btn");
  const progressContainer = document.getElementById("story-progress-bars");

  const imgElement = document.getElementById("story-img-element");
  const videoElement = document.getElementById("story-video-element");

  const userNameLabel = document.getElementById("story-user-name");
  const userImgLabel = document.getElementById("story-user-img");
  const timeLabel = document.getElementById("story-time");

  const tapLeft = document.getElementById("story-tap-left");
  const tapRight = document.getElementById("story-tap-right");
  const volumeBtn = document.getElementById("story-volume-btn");

  // State Trackers
  let currentGroupIndex = 0; // کدام کاربر؟
  let currentItemIndex = 0; // کدام استوریِ آن کاربر؟

  let timer;
  let startTime;
  let remainingTime;
  let isPaused = false;
  let isMuted = true;
  let isAnimatingUser = false; // جلوگیری از تداخل انیمیشن‌ها

  // Touch Swipe Variables
  let touchStartX = 0;
  let touchStartY = 0;

  if (!viewer) return;

  // -----------------------------------------
  // 3. Open/Close Logic
  // -----------------------------------------
  storyThumbnails.forEach((item, index) => {
    item.addEventListener("click", () => {
      // باز کردن گروه مربوطه بر اساس ایندکس دکمه کلیک شده
      // (در پروژه واقعی باید بر اساس ID کاربر مچ شود)
      currentGroupIndex = index % storyGroups.length;
      currentItemIndex = 0; // همیشه از اولین استوری کاربر شروع شود
      openViewer();
    });
  });

  function openViewer() {
    viewer.classList.add("active");
    document.body.style.overflow = "hidden";
    loadStoryGroup(currentGroupIndex, currentItemIndex);
  }

  function closeViewer() {
    viewer.classList.remove("active");
    clearTimeout(timer);
    videoElement.pause();
    document.body.style.overflow = "";
    // پاک کردن کلاس‌های انیمیشن برای دفعه بعد
    setTimeout(() => {
      contentWrapper.className = "story-viewer-content";
    }, 300);
  }

  closeBtn.addEventListener("click", closeViewer);

  // -----------------------------------------
  // 4. Core Loading Logic (Group & Item)
  // -----------------------------------------

  // این تابع وقتی صدا زده می‌شود که کلا گروه کاربری عوض شود
  function loadStoryGroup(groupIndex, itemIndexToStart = 0) {
    currentGroupIndex = groupIndex;
    const groupData = storyGroups[currentGroupIndex];

    // آپدیت اطلاعات هدر (کاربر)
    userNameLabel.textContent = groupData.username;
    userImgLabel.src = groupData.userImg;

    // ساخت نوار پیشرفت به تعداد استوری‌های این کاربر
    progressContainer.innerHTML = "";
    groupData.items.forEach(() => {
      const bar = document.createElement("div");
      bar.classList.add("story-bar");
      const fill = document.createElement("div");
      fill.classList.add("story-bar-fill");
      bar.appendChild(fill);
      progressContainer.appendChild(bar);
    });

    // لود کردن آیتم خاص
    loadStoryItem(itemIndexToStart);
  }

  // این تابع برای تغییر استوری داخل یک گروه است
  function loadStoryItem(index) {
    const groupData = storyGroups[currentGroupIndex];

    // بررسی مرزها (Navigation داخل گروه)
    if (index < 0) {
      // رسیدیم به قبل از اولین استوری -> برو کاربر قبلی
      jumpToPrevUserGroup();
      return;
    }
    if (index >= groupData.items.length) {
      // رسیدیم به بعد از آخرین استوری -> برو کاربر بعدی
      jumpToNextUserGroup();
      return;
    }

    currentItemIndex = index;
    const itemData = groupData.items[currentItemIndex];

    // Reset UI & Timer
    clearTimeout(timer);
    isPaused = false;
    updateProgressBarsUI(currentItemIndex);
    timeLabel.textContent = itemData.time;

    // Handle Media Type
    if (itemData.type === "video") {
      imgElement.classList.remove("active");
      videoElement.classList.add("active");
      videoElement.src = itemData.src;
      videoElement.muted = isMuted;
      videoElement.currentTime = 0;

      // صبر کن تا متادیتای ویدیو لود شود تا زمان واقعی را بگیریم
      videoElement.onloadedmetadata = () => {
        // اگر در حین لود شدن کاربر رفته بود، پخش نکن
        if (!viewer.classList.contains("active")) return;
        startProgress(videoElement.duration * 1000);
        videoElement.play().catch((e) => console.log("Video play failed:", e));
      };
    } else {
      videoElement.pause();
      videoElement.classList.remove("active");
      imgElement.classList.add("active");
      imgElement.src = itemData.src;
      // کمی تاخیر برای اطمینان از لود تصویر قبل از شروع تایمر
      setTimeout(() => {
        startProgress(itemData.duration);
      }, 100);
    }
  }

  // -----------------------------------------
  // 5. User Transition Logic (Swipe Animations)
  // -----------------------------------------

  function jumpToNextUserGroup() {
    if (isAnimatingUser) return;
    if (currentGroupIndex + 1 >= storyGroups.length) {
      closeViewer();
      return;
    }
    performUserTransition("next");
  }

  function jumpToPrevUserGroup() {
    if (isAnimatingUser) return;
    if (currentGroupIndex - 1 < 0) {
      return; // یا closeViewer() اگر می‌خواهید بسته شود
    }
    performUserTransition("prev");
  }

  function performUserTransition(direction) {
    isAnimatingUser = true;
    clearTimeout(timer);
    videoElement.pause();

    // تعیین کلاس‌ها بر اساس جهت RTL
    // Next: حرکت به سمت کاربر سمت چپ (پس خروج به راست)
    // Prev: حرکت به سمت کاربر سمت راست (پس خروج به چپ)
    const outClass =
      direction === "next" ? "story-rtl-next-out" : "story-rtl-prev-out";
    const enterClass =
      direction === "next" ? "story-rtl-next-enter" : "story-rtl-prev-enter";
    const inClass =
      direction === "next" ? "story-rtl-next-in" : "story-rtl-prev-in";

    const newGroupIndex =
      direction === "next" ? currentGroupIndex + 1 : currentGroupIndex - 1;

    // 1. شروع انیمیشن خروج روی آیتم فعلی
    contentWrapper.classList.add(outClass);

    // 2. منتظر می‌مانیم تا انیمیشن خروج تمام شود (500ms)
    setTimeout(() => {
      // --- پشت صحنه ---
      // انیمیشن را موقتا خاموش می‌کنیم تا پرش دیده نشود
      contentWrapper.classList.add("story-no-transition");
      contentWrapper.classList.remove(outClass);

      // داده‌های کاربر جدید را لود می‌کنیم
      // (تایمر را بلافاصله پاک می‌کنیم تا وسط انیمیشن شروع نشود)
      loadStoryGroup(newGroupIndex, 0);
      clearTimeout(timer);

      // کانتینر را به نقطه شروع "ورود" می‌بریم (بیرون کادر)
      contentWrapper.classList.add(enterClass);

      // یک فریم صبر می‌کنیم تا مرورگر موقعیت جدید را رندر کند
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // --- شروع انیمیشن ورود ---
          // انیمیشن را روشن می‌کنیم
          contentWrapper.classList.remove("story-no-transition");
          // کلاس شروع ورود را برمیداریم
          contentWrapper.classList.remove(enterClass);
          // کلاس پایان ورود را اضافه می‌کنیم (حرکت به مرکز)
          contentWrapper.classList.add(inClass);

          // صبر می‌کنیم تا انیمیشن ورود تمام شود
          setTimeout(() => {
            isAnimatingUser = false;
            // تمیزکاری کلاس‌های انیمیشن
            contentWrapper.classList.remove(inClass);

            // شروع تایمر استوری جدید
            const currentItem =
              storyGroups[currentGroupIndex].items[currentItemIndex];
            const duration =
              currentItem.type === "video"
                ? videoElement.duration * 1000
                : currentItem.duration;
            if (duration) startProgress(duration);
          }, 500);
        });
      });
    }, 500); // زمان انیمیشن خروج
  }

  // -----------------------------------------
  // 6. Progress & Timer (Similar to before)
  // -----------------------------------------
  function updateProgressBarsUI(activeIndex) {
    const fills = document.querySelectorAll(".story-bar-fill");
    fills.forEach((fill, idx) => {
      if (idx < activeIndex) {
        fill.style.width = "-100%";
        fill.style.transition = "none";
      } else if (idx > activeIndex) {
        fill.style.width = "0%";
        fill.style.transition = "none";
      } else {
        fill.style.width = "0%"; // Reset current for animation
        // Force reflow
        void fill.offsetWidth;
      }
    });
  }

  function startProgress(duration) {
    if (isAnimatingUser) return; // اگر در حال ترنزیشن یوزر هستیم تایمر نباید کار کنه
    clearTimeout(timer);
    remainingTime = duration || 5000; // Fallback safety

    const fill = document.querySelectorAll(".story-bar-fill")[currentItemIndex];
    if (!fill) return;

    startTime = Date.now();
    // ست کردن ترنزیشن با یک تاخیر بسیار کوچک برای اطمینان از اعمال CSS
    setTimeout(() => {
      if (isPaused || isAnimatingUser) return;
      fill.style.transition = `width ${remainingTime}ms linear`;
      fill.style.width = "100%";
    }, 20);

    timer = setTimeout(() => {
      loadStoryItem(currentItemIndex + 1);
    }, remainingTime);
  }

  // -----------------------------------------
  // 7. Navigation (Taps)
  // -----------------------------------------
  tapRight.addEventListener("click", () => loadStoryItem(currentItemIndex + 1));
  tapLeft.addEventListener("click", () => loadStoryItem(currentItemIndex - 1));

  // -----------------------------------------
  // 8. Pause / Resume (Hold Logic)
  // -----------------------------------------
  const pauseStory = () => {
    if (isAnimatingUser) return;
    isPaused = true;
    clearTimeout(timer);

    const elapsed = Date.now() - startTime;
    remainingTime -= elapsed;

    const fill = document.querySelectorAll(".story-bar-fill")[currentItemIndex];
    if (fill) {
      const computedWidth = getComputedStyle(fill).width;
      fill.style.transition = "none";
      fill.style.width = computedWidth;
    }

    if (
      storyGroups[currentGroupIndex].items[currentItemIndex].type === "video"
    ) {
      videoElement.pause();
    }
  };

  const resumeStory = () => {
    if (!isPaused || isAnimatingUser) return;
    isPaused = false;

    if (
      storyGroups[currentGroupIndex].items[currentItemIndex].type === "video"
    ) {
      videoElement.play();
    }

    const fill = document.querySelectorAll(".story-bar-fill")[currentItemIndex];
    if (fill && remainingTime > 0) {
      fill.style.transition = `width ${remainingTime}ms linear`;
      fill.style.width = "100%";
      startTime = Date.now();
      timer = setTimeout(
        () => loadStoryItem(currentItemIndex + 1),
        remainingTime
      );
    } else {
      // اگر زمانی نمانده بود، برو بعدی
      loadStoryItem(currentItemIndex + 1);
    }
  };

  // Mouse/Touch Events for Hold
  contentWrapper.addEventListener("mousedown", pauseStory);
  contentWrapper.addEventListener("mouseup", resumeStory);
  contentWrapper.addEventListener("mouseleave", resumeStory); // اگر موس از کادر خارج شد
  contentWrapper.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      pauseStory();
    },
    { passive: true }
  );

  // -----------------------------------------
  // 9. Swipe Detection & Volume
  // -----------------------------------------

  contentWrapper.addEventListener(
    "touchend",
    (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // شرط تشخیص اسوایپ: حرکت افقی بیشتر
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        isPaused = false;

        // --- تغییر جهت اینجاست ---
        if (diffX < 0) {
          // Swipe Left (انگشت به چپ کشیده شد) -> برو بعدی
          jumpToNextUserGroup();
        } else {
          // Swipe Right (انگشت به راست کشیده شد) -> برو قبلی
          jumpToPrevUserGroup();
        }
      } else {
        resumeStory();
      }
    },
    { passive: true }
  );

  // Volume Control
  volumeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isMuted = !isMuted;
    videoElement.muted = isMuted;
    volumeBtn.querySelector(".icon").textContent = isMuted
      ? "volume_off"
      : "volume_up";
  });
});
