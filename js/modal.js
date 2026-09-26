const overlay = document.getElementById('modal');
const modal = overlay.querySelector('.modal');
const closeButtons = overlay.querySelectorAll('.modal__close, .modal__close-icon');

let current = null;
let selectedSize = 's';
let selectedAdditives = new Set();

function openModal(product) {
  current = product;
  selectedSize = 's';
  selectedAdditives = new Set();

  document.getElementById('modal-img').src = product.img;
  document.getElementById('modal-img').alt = product.name;
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-text').textContent = product.description;

  renderSizes();
  renderAdditives();
  updateTotal();

  overlay.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeModal() {
  overlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

function renderSizes() {
  const box = document.getElementById('modal-sizes');
  box.innerHTML = Object.entries(current.sizes)
    .map(
      ([key, s]) => `
        <button class="option ${key === selectedSize ? 'is-active' : ''}" type="button" data-size="${key}">
          <span class="option__badge">${key.toUpperCase()}</span>${s.size}
        </button>`
    )
    .join('');
}

function renderAdditives() {
  const box = document.getElementById('modal-additives');
  box.innerHTML = current.additives
    .map(
      (a, i) => `
        <button class="option ${selectedAdditives.has(a.name) ? 'is-active' : ''}" type="button" data-additive="${a.name}">
          <span class="option__badge">${i + 1}</span>${a.name}
        </button>`
    )
    .join('');
}

function updateTotal() {
  const base = Number(current.price);
  const sizeAdd = Number(current.sizes[selectedSize]['add-price']);
  const additivesAdd = current.additives
    .filter((a) => selectedAdditives.has(a.name))
    .reduce((sum, a) => sum + Number(a['add-price']), 0);

  document.getElementById('modal-total').textContent = `$${(base + sizeAdd + additivesAdd).toFixed(2)}`;
}

overlay.addEventListener('click', (e) => {
  const sizeBtn = e.target.closest('[data-size]');
  if (sizeBtn) {
    selectedSize = sizeBtn.dataset.size;
    renderSizes();
    updateTotal();
    return;
  }

  const additiveBtn = e.target.closest('[data-additive]');
  if (additiveBtn) {
    const name = additiveBtn.dataset.additive;
    selectedAdditives.has(name) ? selectedAdditives.delete(name) : selectedAdditives.add(name);
    renderAdditives();
    updateTotal();
    return;
  }

  if (e.target === overlay || e.target.closest('.modal__close') || e.target.closest('.modal__close-icon')) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
});