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
