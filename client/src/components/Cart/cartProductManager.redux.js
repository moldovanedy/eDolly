import { createSlice } from "@reduxjs/toolkit";

export function getCartProducts(id) {
    let cartProducts = JSON.parse(localStorage.getItem("cart")),
        result = [];

    if (cartProducts === null || cartProducts === undefined) {
        return null;
    }

    if (id === undefined) {
        for (var i in cartProducts) {
            result.push([i, cartProducts[i]]);
        }
        return result;
    } else {
        if (cartProducts !== null && cartProducts !== undefined) {
            return cartProducts[id];
        }
    }
}

export function getCartSize() {
    let productArray = getCartProducts();
    if (productArray === null || productArray === undefined) {
        return 0;
    } else {
        return productArray.length;
    }
}

export function addToCart(id) {
    var cartProducts = JSON.parse(localStorage.getItem("cart"));

    if (cartProducts === null || cartProducts === undefined) {
        cartProducts = {};
        cartProducts[id] = 1;
        localStorage.setItem("cart", JSON.stringify(cartProducts));
    } else {
        cartProducts[id] = 1;
        localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
}

export function modifyNumberOfProducts(id, number) {
    var cartProducts = JSON.parse(localStorage.getItem("cart"));

    if (cartProducts === null || cartProducts === undefined) {
        return null;
    }

    cartProducts[id] = number;
    localStorage.setItem("cart", JSON.stringify(cartProducts));
}

export function getNumberOfProducts(id) {
    var cartProducts = JSON.parse(localStorage.getItem("cart"));

    if (cartProducts === null || cartProducts === undefined) {
        return 0;
    }

    return cartProducts[id];
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
    let cartProducts = JSON.parse(localStorage.getItem("cart"));

    if (cartProducts === null || cartProducts === undefined) {
        return null;
    } else {
        delete cartProducts[productId];
        console.log(cartProducts);
        localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
}

export function doesProductExist(id) {
    let cartProducts = JSON.parse(localStorage.getItem("cart"));

    if (cartProducts === null || cartProducts === undefined) {
        return null;
    } else {
        if (cartProducts[id] === undefined) {
            return false;
        } else {
            return true;
        }
    }
}

export const { incrementCartSize, decrementCartSize } =
    cartProductCounter.actions;

export default cartProductCounter.reducer;
