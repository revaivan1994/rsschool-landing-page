const root = document.documentElement;
const buttons = document.querySelectorAll('.theme-toggle__btn');

function applyTheme(theme) {
  root.dataset.theme = theme;
  buttons.forEach((btn) => {
    const active = btn.dataset.theme === theme;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

let saved = null;
try {
  saved = localStorage.getItem('theme');
} catch {}

applyTheme(saved === 'dark' ? 'dark' : 'light');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    applyTheme(btn.dataset.theme);
    try {
      localStorage.setItem('theme', btn.dataset.theme);
    } catch {}
  });
});