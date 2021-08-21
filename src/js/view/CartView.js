import View from './view.js';

class CartView extends View {
	_parentEl = document.querySelector('.cart__content');
	_errorMessage = 'Recipes loading failed';

	_window = document.querySelector('.modal');
	_overlay = document.querySelector('.overlay');
	_btnOpen = document.querySelector('.button--open-cart');
	_btnClose = document.querySelector('.button--close-cart');

	constructor() {
		super();
		this._addHandlerModalWindow();
	}

	closeWindow() {
		this._overlay.classList.add('hidden');
		this._window.classList.add('hidden');
	}

	openWindow() {
		this._overlay.classList.remove('hidden');
		this._window.classList.remove('hidden');
	}

	_addHandlerModalWindow() {
		[this._overlay, this._btnClose].forEach((el) => {
			el.addEventListener('click', () => this.closeWindow());
		});
		this._btnOpen.addEventListener('click', () => this.openWindow());
	}

	_generateMarkup() {
		return `
			<div class="cart-item">
				${this._data.goods.map((good) =>
					this._generateCartBurgerMarkup(good)
				)}
				<button class="button cart-item__button" type="button">+</button>
				<button class="button cart-item__button" type="button">-</button>
			</div>`;
	}

	_generateCartBurgerMarkup(good) {
		const burgerMarkup = `
            <p class="cart-item__content">
                <span>${good.burger.title}</span>
                <span>${good.burger.price}</span>
                <span>${good.burger.cal}</span>
            </p>
            `;

		const supplementsMarkup = good.supplements
			.map((sup) => {
				console.log(sup);
				return `
                        <p>
                            <span>${sup.title}</span>
                            <span>${sup.price}</span>
                            <span>${sup.cal}</span>
                            <span>${sup.isAdded}</span>
                        </p>
                    `;
			})
			.join('');

		return burgerMarkup + supplementsMarkup;
	}
}

export default new CartView();
