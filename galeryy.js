const productsBtn = document.querySelectorAll('.buy__link');
const cartProductsList = document.querySelector('.cart-content-list');
const cart = document.querySelector('.cart');
const cartQuantity = cart.querySelector('.cart-quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printQuantity = () => {
	let productsListLength = cartProductsList.querySelector('.simplebar-content').children.length;
	cartQuantity.textContent = productsListLength;
	productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)}$`;
};

const generateCartProduct = (img, title, price, id) => {
	return `
    <li class="cart-content-item">
   <article class="cart-content-product cart-product" data-id="${id}">
    <img src="${img}" alt="Buy painting" class="cart-product-img">
    <div class="cart-product-text">
    <h3 class="cart-product-title">${title}</h3>
    <span class="cart-product-price">${normalPrice(price)}$</span>
    </div>
    <button class="cart-product-delete"></button>
    </li>
	`;
};

const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.buy__item[data-id="${id}"]`).querySelector('.buy__link').disabled = false;
	
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product-price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();

	printQuantity();
};

productsBtn.forEach(el => {
	el.closest('.buy__item').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
    let self = e.currentTarget;
    let parent = self.closest('.buy__item');
    let id = parent.dataset.id;
    let img = parent.querySelector('.buy__photo').getAttribute('src');
    let title = parent.querySelector('.pictures__name').textContent;
    let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.buy__price').textContent));

		plusFullPrice(priceNumber);

		printFullPrice();

		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));
		printQuantity();

		
		self.disabled = true;
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product-delete')) {
		deleteProducts(e.target.closest('.cart-content-item'));
	}
});



