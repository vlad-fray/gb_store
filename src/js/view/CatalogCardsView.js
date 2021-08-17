import View from './view.js';

class CatalogCardsView extends View {
	_parentEl = document.querySelector('.catalog');
	_errorMessage = 'Recipes loading failed';

	addHandlerAddToCart(handler) {
		window.addEventListener('load', handler);
	}

	_generateMarkup() {
		return this._data
			.map((good) => {
				return `
			<div class="catalog-item">
				<div class='catalog-item__img-fill'></div>
				<h3 class="catalog-item__heading">Good: ${good.title}</h3>
				<p class="catalog-item__price">Price: $${good.price}</p>
				<button class="button catalog-item__button" type="button">Add to cart</button>
			</div>`;
			})
			.join('');
	}
}

export default new CatalogCardsView();
