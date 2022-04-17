import { configureStore } from "@reduxjs/toolkit";
import productManager from "./components/Cart/productManager.redux";
import filterManager from "./components/filterManager.redux";
import sortingManager from "./components/sortingManager.redux";

export const store = configureStore({
    reducer: {
        products: productManager,
        filters: filterManager,
        sort: sortingManager
    }
});
