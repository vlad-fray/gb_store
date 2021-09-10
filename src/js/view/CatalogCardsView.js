import View from './view.js';

class CatalogCardsView extends View {
  _parentEl = document.querySelector('.catalog');
  _errorMessage = 'Recipes loading failed';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerAddToCart(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.catalog-item__button');

      if (!btn) return;

      const { itemId } = e.target.closest('.catalog-item').dataset;
      handler(itemId);
    });
  }

  _generateMarkup() {
    return this._data
      .map((good) => {
        return `
			<div class="catalog-item" data-item-id='${good.id}'>
          <img class='catalog-item__img-fill' src='/src/img/${good.imgUrl}' alt='${good.title}'/>
        <div class="catalog-item__content">
          <h3 class="catalog-item__heading">${good.title}</h3>
				  <p class="catalog-item__info">Price: $${good.price}</p>
				  <p class="catalog-item__info">Calorie: $${good.cal}</p>
				  <button class="button catalog-item__button" type="button">Add to cart</button>
        </div>
			</div>`;
      })
      .join('');
  }
}

export default new CatalogCardsView();
