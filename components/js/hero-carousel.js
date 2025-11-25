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
