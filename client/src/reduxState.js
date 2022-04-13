import { configureStore } from "@reduxjs/toolkit";
import productManager from "./components/Cart/productManager.redux";
import filterManager from "./components/filterManager.component";
import sortingManager from "./components/sortingManager.component";

export const store = configureStore({
    reducer: {
        products: productManager,
        filters: filterManager,
        sort: sortingManager
    }
});
