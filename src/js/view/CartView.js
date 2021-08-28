import View from './view.js';

const validateNameInput = (value) => {
  const regExp = /^[a-zа-яё\s]+$/gi;
  return regExp.test(value.trim());
};

const validateNumberInput = (value) => {
  const regExp = /^\+7\(\d{3}\)\d{3}-\d{4}$/g;
  return regExp.test(value.trim());
};

const validateEmailInput = (value) => {
  const regExp = /^[a-zA-z]{1}[a-zA-Z\.-\d]*@[a-z]{2,6}.[a-z]{2,4}$/;
  return regExp.test(value.trim()) || value.trim().length === 0;
};

class CartView extends View {
  _parentEl = document.querySelector('.cart__content');
  _errorMessage = 'Recipes loading failed';

  _window = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.button--open-cart');
  _btnCancel = document.querySelector('.button--cancel-cart');
  _btnOrdering = document.querySelector('.button--cart-ordering');

  _orderForm = document.querySelector('.order-form');
  _btnMakeOrder = document.querySelector('.button--cart-make-order');
  _btnCloseOrder = document.querySelector('.button--close-order');

  _nameInput = document.getElementById('name');
  _numberInput = document.getElementById('number');
  _emailInput = document.getElementById('email');
  _messageInput = document.getElementById('message');

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

  _closeWindow() {
    this._overlay.classList.add('hidden');
    this._window.classList.add('hidden');
  }

  _openWindow() {
    this._overlay.classList.remove('hidden');
    this._window.classList.remove('hidden');
  }

  _addHandlerModalWindow() {
    [this._overlay, this._btnCancel].forEach((el) => {
      el.addEventListener('click', () => this._closeWindow());
    });
    this._btnOpen.addEventListener('click', () => this._openWindow());
  }

  _generateMarkup() {
    if (!this._data.isOrdering && this._data.totalPrice < 0.1) {
      return `
        <h3>Cart is empty</h3>
      `;
    }

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

  addHandlerOpenOrderingForm(handler) {
    this._btnOrdering.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this._data || this._data.totalPrice < 0.1) {
        alert('Cart is empty!');
        return;
      }

      handler();
      this._openOrderingForm();
    });
  }

  addHandlerCloseOrderingForm(handler) {
    this._btnCloseOrder.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
      this._closeOrderingForm();
    });
  }

  addHandlerSubmitOrderingFrom(handler) {
    this._btnMakeOrder.addEventListener('click', (e) => {
      e.preventDefault();

      const data = {
        nameInput: this._nameInput.value,
        numberInput: this._numberInput.value,
        emailInput: this._emailInput.value,
        messageInput: this._messageInput.value,
      };
      console.log(data);

      const errorInput = this._checkValidation(data);
      this._clearErrors();
      if (errorInput) {
        errorInput.classList.add('order-input--error');
        return;
      }
      handler(data);
    });
  }

  _clearErrors() {
    this._nameInput.classList.remove('order-input--error');
    this._numberInput.classList.remove('order-input--error');
    this._emailInput.classList.remove('order-input--error');
  }

  _checkValidation(data) {
    const isValidName = validateNameInput(data.nameInput);
    const isValidNumber = validateNumberInput(data.numberInput);
    const isValidEmail = validateEmailInput(data.emailInput);
    if (!isValidName) return this._nameInput;
    if (!isValidNumber) return this._numberInput;
    if (!isValidEmail) return this._emailInput;
    return null;
  }

  _closeOrderingForm() {
    this._orderForm.classList.add('hidden');
    this._btnCancel.classList.remove('hidden');
    this._btnOrdering.classList.remove('hidden');
  }

  _openOrderingForm() {
    this._orderForm.classList.remove('hidden');
    this._btnCancel.classList.add('hidden');
    this._btnOrdering.classList.add('hidden');
  }
}

export default new CartView();
