import * as model from './model.js';

import catalogCardsView from './view/CatalogCardsView.js';

/////////////////////////////

const controlCatalog = () => {
	try {
		catalogCardsView.render(model.state.goods);
	} catch (err) {
		catalogCardsView.renderError();
	}
};

const init = () => {
	catalogCardsView.addHandlerAddToCart(controlCatalog);
};

init();
