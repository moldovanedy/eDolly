import { createSlice } from "@reduxjs/toolkit";

export function getFavouriteProducts(id) {
    let regex = /(.*?);/g;
    let favProductsRaw = localStorage.getItem("favouriteProducts");

    if (favProductsRaw === null) {
        return null;
    }

    let favProductsArray = favProductsRaw.match(regex);
    if (id === undefined) {
        return favProductsArray;
    } else {
        if (favProductsArray !== null) {
            return favProductsArray.find((prodId) => {
                return prodId === id;
            }, undefined);
        }
    }
}

export function getNumberOfProducts() {
    let productArray = getFavouriteProducts();
    if (productArray === null) {
        return 0;
    } else {
        return productArray.length;
    }
}

export function addToFavourites(productId) {
    let favProductsRaw = localStorage.getItem("favouriteProducts");
    let productAlreadyExists =
        getFavouriteProducts(productId + ";") !== undefined ? true : false;

    if (favProductsRaw === null || favProductsRaw === undefined) {
        localStorage.setItem("favouriteProducts", productId + ";");
    } else {
        if (productAlreadyExists) {
            return null;
        }
        localStorage.setItem(
            "favouriteProducts",
            favProductsRaw + productId + ";"
        );
    }
}

export function removeFromFavourites(productId) {
    let favProductsRaw = localStorage.getItem("favouriteProducts");
    let product = getFavouriteProducts(productId + ";");

    if (
        favProductsRaw === null ||
        favProductsRaw === undefined ||
        product === undefined
    ) {
        return null;
    } else {
        let newFavProductsRaw = favProductsRaw.replace(productId + ";", "");
        localStorage.setItem("favouriteProducts", newFavProductsRaw);
    }
}

//<redux>
const initialState = {
    value: getNumberOfProducts()
};

export const favProductCounter = createSlice({
    name: "products",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
});
//</redux>

export const { increment, decrement } = favProductCounter.actions;
export default favProductCounter.reducer;
