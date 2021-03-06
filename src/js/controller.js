import * as model from './model.js';

import catalogCardsView from './view/CatalogCardsView.js';
import cartView from './view/CartView.js';
import { API } from './config.js';
// import orderingView from './view/OrderingView.js';

/////////////////////////////

const controlCatalogRender = async () => {
  try {
    await model.loadCatalogItemsFromDatabase(`${API}/goodsList.json`);

    catalogCardsView.render(model.state.goods.burgers);
  } catch (err) {
    catalogCardsView.renderError();
  }
};

const controlCartRender = () => {
  try {
    cartView.render(model.state.cart);
  } catch (err) {
    cartView.renderError();
  }
};

const controllAddGoodToCart = (id) => {
  model.addToCart(id);
  controlCartRender();
};

const controlToggleSupMeal = (itemId, supId) => {
  model.toggleSupMeal(itemId, supId);
  controlCartRender();
};

const controlRemoveItemFromCart = (id) => {
  model.removeItemFromCart(id);
  controlCartRender();
};

const controlOpenOrdering = () => {
  model.openOrderingForm();
  controlCartRender();
};

const controlCloseOrdering = () => {
  model.closeOrderingForm();
  controlCartRender();
};

const controlSubmitOrderingForm = (data) => {
  model.submitOrderingForm(data);
  controlCartRender();
};

const init = () => {
  catalogCardsView.addHandlerRender(controlCatalogRender);
  catalogCardsView.addHandlerAddToCart(controllAddGoodToCart);
  cartView.addHandlerToggleSupMeal(controlToggleSupMeal);
  cartView.addHandlerRemoveItemFromCart(controlRemoveItemFromCart);
  cartView.addHandlerOpenOrderingForm(controlOpenOrdering);
  cartView.addHandlerCloseOrderingForm(controlCloseOrdering);
  cartView.addHandlerSubmitOrderingFrom(controlSubmitOrderingForm);
};

init();
