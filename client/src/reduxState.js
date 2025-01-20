import { configureStore } from "@reduxjs/toolkit";
import productManager from "./components/Cart/productManager.redux.js";
import cartProductManager from "./components/Cart/cartProductManager.redux.js";
import filterManager from "./components/filterManager.redux.js";
import sortingManager from "./components/sortingManager.redux.js";
import explorerOverlayManager from "./components/Product/explorerOverlayManager.redux.js";

export const store = configureStore({
    reducer: {
        products: productManager,
        cartProducts: cartProductManager,
        filters: filterManager,
        sort: sortingManager,
        explorer: explorerOverlayManager
    }
});
