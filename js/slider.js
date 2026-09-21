const slider = document.querySelector('.slider');

if (slider) {
  const track = slider.querySelector('.slider__track');
  const slides = slider.querySelectorAll('.slider__slide');
  const dots = slider.querySelectorAll('.slider__dot');
  const prev = slider.querySelector('.slider__arrow--prev');
  const next = slider.querySelector('.slider__arrow--next');
  let index = 0;

  function goTo(i) {
    index = (i + slides.length) % slides.length; // по кругу
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, n) => {
      const active = n === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', String(active));
    });
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot, n) => dot.addEventListener('click', () => goTo(n)));
}