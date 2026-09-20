const products = {
    coffee: [
        { name: 'Irish coffee', text: 'Fragrant black coffee with Jameson Irish whiskey and whipped milk', price: 7, img: 'img/market-page/coffee-1.jpg' },
        { name: 'Kahlua coffee', text: 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk', price: 7, img: 'img/market-page/coffee-2.jpg' },
        { name: 'Honey raf', text: 'Espresso with frothed milk, cream and aromatic honey', price: 5.5, img: 'img/market-page/coffee-3.jpg' },
        { name: 'Ice cappuccino', text: 'Cappuccino with soft thick foam in summer version with ice', price: 5, img: 'img/market-page/coffee-4.jpg' },
        { name: 'Espresso', text: 'Classic black coffee', price: 4.5, img: 'img/market-page/coffee-5.jpg' },
        { name: 'Latte', text: 'Espresso coffee with the addition of steamed milk and dense milk foam', price: 5.5, img: 'img/market-page/coffee-6.jpg' },
        { name: 'Latte macchiato', text: 'Espresso with frothed milk and chocolate', price: 5.5, img: 'img/market-page/coffee-7.jpg' },
        { name: 'Coffee with cognac', text: 'Fragrant black coffee with cognac and whipped cream', price: 6.5, img: 'img/market-page/coffee-8.jpg' },
    ],
    tea: [
        { name: 'Moroccan', text: 'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint', price: 4.5, img: 'img/market-page/tea-1.png' },
        { name: 'Ginger', text: 'Original black tea with fresh ginger, lemon and honey', price: 5, img: 'img/market-page/tea-2.png' },
        { name: 'Cranberry', text: 'Invigorating black tea with cranberry and honey', price: 5, img: 'img/market-page/tea-3.png' },
        { name: 'Sea buckthorn', text: 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon', price: 5.5, img: 'img/market-page/tea-4.png' },
    ],
    dessert: [
        { name: 'Marble cheesecake', text: 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam', price: 3.5, img: 'img/market-page/dessert-1.png' },
        { name: 'Red velvet', text: 'Layer cake with cream cheese frosting', price: 4, img: 'img/market-page/dessert-2.png' },
        { name: 'Cheesecakes', text: 'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar', price: 4.5, img: 'img/market-page/dessert-3.png' },
        { name: 'Creme brulee', text: 'Delicate creamy dessert in a caramel basket with wild berries', price: 4, img: 'img/market-page/dessert-4.png' },
        { name: 'Pancakes', text: 'Tender pancakes with strawberry jam and fresh strawberries', price: 4.5, img: 'img/market-page/dessert-5.png' },
        { name: 'Honey cake', text: 'Classic honey cake with delicate custard', price: 4.5, img: 'img/market-page/dessert-6.png' },
        { name: 'Chocolate cake', text: 'Cake with hot chocolate filling and nuts with dried apricots', price: 5.5, img: 'img/market-page/dessert-7.png' },
        { name: 'Black forest', text: 'A combination of thin sponge cake with cherry jam and light chocolate mousse', price: 6.5, img: 'img/market-page/dessert-8.png' },
    ],
};

const grid = document.querySelector('.menu__grid');
const tabs = document.querySelectorAll('.tab');

function render(category) {
    grid.innerHTML = products[category]
        .map(
            ({ name, text, price, img }) => `
        <li class="card">
          <img class="card__img" src="${img}" alt="" width="310" height="310" loading="lazy">
          <div class="card__body">
            <h2 class="card__name">${name}</h2>
            <p class="card__text">${text}</p>
            <p class="card__price">$${price.toFixed(2)}</p>
          </div>
        </li>`
        )
        .join('');
}

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

render('coffee');