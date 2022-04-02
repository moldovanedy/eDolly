import { createSlice } from "@reduxjs/toolkit";

export function getProducts(id) {
    let regex = /(.*?);/g;
    let favProductsRaw = localStorage.getItem("favouriteProducts");

    if (favProductsRaw === null) {
        return null;
    }

    let favProductsArray = favProductsRaw.match(regex);
    if (id === undefined) {
        return favProductsArray;
    } else {
        return favProductsArray.find(id);
    }
}

export function getNumberOfProducts() {
    let productArray = getProducts();
    if (productArray === null) {
        return 0;
    } else {
        return productArray.length;
    }
}

export function addToFavourites(productId) {
    let favProductsRaw = localStorage.getItem("favouriteProducts");
    //let productAlreadyExists = getProducts(productId) !== null ? true : false;

    if (favProductsRaw === null || favProductsRaw === undefined) {
        localStorage.setItem("favouriteProducts", productId + ";");
    } else {
        // if (productAlreadyExists) {
        //     return -1;
        // }
        localStorage.setItem(
            "favouriteProducts",
            favProductsRaw + productId + ";"
        );
    }
}

//#region redux
const initialState = {
    value: getNumberOfProducts()
};

export const productCounter = createSlice({
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
//#endregion

export const { increment, decrement } = productCounter.actions;

export default productCounter.reducer;
