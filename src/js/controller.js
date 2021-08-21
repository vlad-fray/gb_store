import * as model from './model.js';

import catalogCardsView from './view/CatalogCardsView.js';
import cartView from './view/CartView.js';

/////////////////////////////

const controlCatalogRender = () => {
	try {
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

const controlToggleSupMeal = (burgerId, supId) => {
	model.toggleSupMeal(burgerId, supId);
	controlCartRender();
};

const init = () => {
	catalogCardsView.addHandlerRender(controlCatalogRender);
	catalogCardsView.addHandlerAddToCart(controllAddGoodToCart);
	cartView.addHandlerToggleSupMeal(controlToggleSupMeal);
};

init();
