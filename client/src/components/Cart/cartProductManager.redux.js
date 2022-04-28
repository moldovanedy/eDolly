import { createSlice } from "@reduxjs/toolkit";

export function getCartProducts(id) {
    let regex = /(.*?);/g,
        cartProductsArray;
    let cartRaw = localStorage.getItem("cart");

    if (cartRaw !== null) {
        cartProductsArray = cartRaw.match(regex);
    }

    if (id === undefined) {
        return cartProductsArray;
    } else {
        if (cartProductsArray !== null && cartProductsArray !== undefined) {
            return cartProductsArray.find((prodId) => {
                return prodId === id;
            }, undefined);
        }
    }
}

export function getCartSize() {
    let productArray = getCartProducts();
    if (productArray === null) {
        return 0;
    } else {
        return productArray.length;
    }
}

export function addToCart(productId) {
    let cartRaw = localStorage.getItem("cart");
    let productAlreadyExists =
        getCartProducts(productId + ";") !== undefined ? true : false;

    if (cartRaw === null || cartRaw === undefined) {
        localStorage.setItem("cart", productId + ";");
    } else {
        if (productAlreadyExists) {
            return null;
        }
        localStorage.setItem("cart", cartRaw + productId + ";");
    }
}

const initialState = {
    value: getCartSize()
};

export const cartProductCounter = createSlice({
    name: "cartProducts",
    initialState,
    reducers: {
        incrementCartSize: (state) => {
            state.value += 1;
        },
        decrementCartSize: (state) => {
            state.value -= 1;
        }
    }
});

export function removeFromCart(productId) {
    let cartProductsRaw = localStorage.getItem("cart");
    let product = getCartProducts(productId + ";");

    if (
        cartProductsRaw === null ||
        cartProductsRaw === undefined ||
        product === undefined
    ) {
        return null;
    } else {
        let newCartProductsRaw = cartProductsRaw.replace(productId + ";", "");
        localStorage.setItem("cart", newCartProductsRaw);
    }
}

export const { incrementCartSize, decrementCartSize } =
    cartProductCounter.actions;

export default cartProductCounter.reducer;
