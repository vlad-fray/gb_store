export const state = {
	// goods: [
	// 	{ title: 'Shirt', price: 150 },
	// 	{ title: 'Socks', price: 50 },
	// 	{ title: 'Jacket', price: 350 },
	// 	{ title: 'Shoes', price: 250 },
	// ],
	goods: {
		burgers: [
			{ id: 'b1', title: 'Tiny burger', price: 1, cal: 20 },
			{ id: 'b2', title: 'Big burger', price: 2, cal: 40 },
		],
		supplements: {
			toBurgers: [
				{ id: 's1', title: 'Cheese', price: 0.2, cal: 20 },
				{ id: 's2', title: 'Salad', price: 0.4, cal: 5 },
				{ id: 's3', title: 'Potato', price: 0.3, cal: 10 },
				{ id: 's4', title: 'Seasoning', price: 0.3, cal: 0 },
				{ id: 's5', title: 'Mayonnaise', price: 0.4, cal: 5 },
			],
		},
	},
	cart: {
		goods: [],
		totalPrice: 0,
		totalCal: 0,
	},
};

export const addToCart = (id) => {
	const currentGood = state.goods.burgers.find(
		(burger) => burger.id === id
	);

	const supplements = state.goods.supplements.toBurgers.map((sup) => {
		return {
			...sup,
			isAdded: false,
		};
	});

	const newCartItem = {
		burger: currentGood,
		supplements: [...supplements],
	};

	state.cart.totalPrice += currentGood.price;
	state.cart.totalCal += currentGood.cal;
	state.cart.goods.push(newCartItem);
};
