const IMAGES = {
  coffee: ['coffee-1.jpg', 'coffee-2.jpg', 'coffee-3.jpg', 'coffee-4.jpg', 'coffee-5.jpg', 'coffee-6.jpg', 'coffee-7.jpg', 'coffee-8.jpg'],
  tea: ['tea-1.png', 'tea-2.png', 'tea-3.png', 'tea-4.png'],
  dessert: ['dessert-1.png', 'dessert-2.png', 'dessert-3.png', 'dessert-4.png', 'dessert-5.png', 'dessert-6.png', 'dessert-7.png', 'dessert-8.png'],
};
const IMG_PATH = 'img/market-page/';

let products = [];

async function loadProducts() {
  const res = await fetch('products.json');
  products = await res.json();
  attachImages();
  render('coffee');
}

function attachImages() {
  const counters = {};
  products.forEach((p) => {
    const i = counters[p.category] ?? 0;
    p.img = IMG_PATH + (IMAGES[p.category]?.[i] ?? 'placeholder.svg');
    counters[p.category] = i + 1;
  });
}

const grid = document.querySelector('.menu__grid');
const tabs = document.querySelectorAll('.tab');

const INITIAL_COUNT = 4;
const mq = window.matchMedia('(max-width: 768px)');
const loadMoreBtn = document.querySelector('.load-more');

let currentCategory = 'coffee';
let expanded = false;

function render(category) {
  currentCategory = category;
  const items = products.filter((p) => p.category === category);
  const showAll = !mq.matches || expanded;
  const visible = showAll ? items : items.slice(0, INITIAL_COUNT);

  grid.innerHTML = visible
    .map(
      (p) => `
        <li>
          <button class="card" type="button" data-name="${p.name}">
            <img class="card__img" src="${p.img}" alt="" width="310" height="310" loading="lazy">
            <span class="card__body">
              <span class="card__name">${p.name}</span>
              <span class="card__text">${p.description}</span>
              <span class="card__price">$${Number(p.price).toFixed(2)}</span>
            </span>
          </button>
        </li>`
    )
    .join('');

  loadMoreBtn.hidden = showAll || items.length <= INITIAL_COUNT;
}

loadMoreBtn.addEventListener('click', () => {
  expanded = true;
  render(currentCategory);
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-pressed', String(active));
    });
    expanded = false;            
    render(tab.dataset.category);
  });
});

mq.addEventListener('change', (e) => {
  if (e.matches) expanded = false; 
  render(currentCategory);
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-pressed', String(active));
    });
    render(tab.dataset.category);
  });
});

grid.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const product = products.find((p) => p.name === card.dataset.name);
  if (product) openModal(product);
});

loadProducts();