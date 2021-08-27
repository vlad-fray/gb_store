export const state = {
  goods: {},
  cart: {
    goods: [],
    totalPrice: 0,
    totalCal: 0,
    isOrdering: false,
  },
};

export const loadCatalogItemsFromDatabase = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    state.goods = data;
  } catch (err) {
    throw new Error(err.message);
  }
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

  const ranNum = Math.floor(Math.random() * 500);

  const newCartItem = {
    id: `burger${ranNum}`,
    item: currentGood,
    supplements: [...supplements],
    itemPrice: currentGood.price,
    itemCal: currentGood.cal,
  };

  state.cart.totalPrice += currentGood.price;
  state.cart.totalCal += currentGood.cal;
  state.cart.goods.push(newCartItem);
};

export const toggleSupMeal = (burgerId, supId) => {
  const currentItem = state.cart.goods.find(
    (burger) => burger.id === burgerId
  );

  const currentSup = currentItem.supplements.find(
    (sup) => sup.id === supId
  );

  if (currentSup.isAdded) {
    state.cart.totalPrice -= currentSup.price;
    currentItem.itemPrice -= currentSup.price;
    state.cart.totalCal -= currentSup.cal;
    currentItem.itemCal -= currentSup.cal;
  } else {
    state.cart.totalPrice += currentSup.price;
    currentItem.itemPrice += currentSup.price;
    state.cart.totalCal += currentSup.cal;
    currentItem.itemCal += currentSup.cal;
  }

  currentSup.isAdded = !currentSup.isAdded;
};

export const removeItemFromCart = (itemId) => {
  const itemToDelete = state.cart.goods.find(
    (good) => good.id === itemId
  );
  state.cart.totalPrice -= itemToDelete.itemPrice;
  state.cart.totalCal -= itemToDelete.itemCal;

  state.cart.goods = state.cart.goods.filter(
    (good) => good.id !== itemId
  );
};

export const submitOrderingForm = (userData) => {};
