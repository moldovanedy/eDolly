import { configureStore } from "@reduxjs/toolkit";
import productManager from "./components/Cart/productManager.redux";
import cartProductManager from "./components/Cart/cartProductManager.redux";
import filterManager from "./components/filterManager.redux";
import sortingManager from "./components/sortingManager.redux";
import explorerOverlayManager from "./components/Product/explorerOverlayManager.redux";

export const store = configureStore({
    reducer: {
        products: productManager,
        cartProducts: cartProductManager,
        filters: filterManager,
        sort: sortingManager,
        explorer: explorerOverlayManager
    }
});
