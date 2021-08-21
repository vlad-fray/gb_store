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

const controllAddGoodToCart = (id) => {
	model.addToCart(id);
	controlCartRender();
};

const controlCartRender = () => {
	try {
		cartView.render(model.state.cart);
	} catch (err) {
		cartView.renderError();
	}
};

const init = () => {
	catalogCardsView.addHandlerRender(controlCatalogRender);
	catalogCardsView.addHandlerAddToCart(controllAddGoodToCart);
};

init();
