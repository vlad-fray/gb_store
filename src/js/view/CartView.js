import View from './view.js';

class CartView extends View {
  _parentEl = document.querySelector('.cart__content');
  _errorMessage = 'Recipes loading failed';

  _window = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.button--open-cart');
  _btnClose = document.querySelector('.button--close-cart');
  _btnOrdering = document.querySelector('.button--cart-ordering');

  constructor() {
    super();
    this._addHandlerModalWindow();
  }

  addHandlerToggleSupMeal(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.cart-toggle__button');

      if (!btn) return;

      const burgerId = e.target.closest('.cart-item').dataset.id;
      const supId = e.target.closest('.cart-item__supplement').dataset
        .id;
      handler(burgerId, supId);
    });
  }

  addHandlerRemoveItemFromCart(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.button--remove-item');

      if (!btn) return;

      const burgerId = e.target.closest('.cart-item').dataset.id;
      handler(burgerId);
    });
  }

  addHandlerToggleOrderingStatus(handler) {
    this._btnOrdering.addEventListener('click', function (e) {
      handler();
    });
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
    if (!this._data.isOrdering) {
      const cartItems = this._data.goods
        .map((good) => this._generateCartItemMarkup(good))
        .join('');

      return `
        ${cartItems}
        <h4 class="cart__price">Total price:
            ${this._data.totalPrice.toFixed(2)}$
        </h4>
        <h4 class="cart__price">Total calorie:
            ${this._data.totalCal.toFixed(2)} cal
        </h4>
      `;
    }

    if (this._data.isOrdering) {
      return `
        ${this._generateOrderingMarkup()}
      `;
    }
  }

  _generateCartItemMarkup(good) {
    const itemMarkup = `
        <h3 class="cart-item__title">
          ${good.item.title}
          <button class="button button--remove-item">&#215;</button>
        </h3>
        <p class="cart-item__info">${good.item.price}$</p>
        <p class="cart-item__info">${good.item.cal} cal</p>
        `;

    const supplementsMarkup = good.supplements
      .map((sup) => {
        return `
            <p class="cart-item__supplement" data-id='${sup.id}'>
                <span>${sup.title}</span>
                <span>${sup.price}$</span>
                <span>${sup.cal} cal</span>
                <button
                    class="button
                    cart-toggle__button
                    ${
                      sup.isAdded ? 'cart-toggle__button--marked' : ''
                    }"
                    type="button"
                >
                    &#10003;
                </button>
            </p>
        `;
      })
      .join('');

    return `
        <div class="cart-item" data-id='${good.id}'>
            ${itemMarkup} 
            <div class="cart-item__supplements">
            <h4>Add it to your burger:</h4>
                <div>
                    ${supplementsMarkup}
                </div>
            </div>
            <h4 class="cart-item__total">Burger price:
                ${good.itemPrice.toFixed(2)}$
            </h4>
            <h4 class="cart-item__total">Burger calorie:
                ${good.itemCal.toFixed(2)} cal
            </h4>
        </div>`;
  }

  _generateOrderingMarkup() {
    return `
    
    `;
  }
}

export default new CartView();
