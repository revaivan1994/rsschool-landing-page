const burger = document.querySelector('.burger');
const nav = document.querySelector('#site-nav');

if (burger && nav) {
  const desktop = window.matchMedia('(min-width: 1025px)');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  burger.addEventListener('click', () => {
    setMenu(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      burger.focus();
    }
  });

  desktop.addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });
}