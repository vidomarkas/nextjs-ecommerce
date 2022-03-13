/* eslint-disable no-mixed-spaces-and-tabs */
import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
	// darkMode: Cookies.get("darkMode") === "ON" ? true : false,
	darkMode: false,
	cart: {
		cartItems: Cookies.get("cartItems")
			? JSON.parse(Cookies.get("cartItems"))
			: [],
	},
};

function reducer(state, action) {
	switch (action.type) {
		case "DARK_MODE_ON":
			return { ...state, darkMode: true };

		case "DARK_MODE_OFF":
			return { ...state, darkMode: false };
		case "CART_ADD_ITEM": {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) => item._id === newItem._id
			);

			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item.name === existItem.name ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			Cookies.set("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}

		case "CART_REMOVE_ITEM": {
			const removedItemID = action.payload;

			const cartItems = [...state.cart.cartItems];

			const filteredCartItems = cartItems.filter(
				(item) => item._id !== removedItemID
			);

			Cookies.set("cartItems", JSON.stringify(filteredCartItems));

			return {
				...state,
				cart: { ...state.cart, cartItems: filteredCartItems },
			};
		}

		default:
			return state;
	}
}

export function StoreProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
