import { configureStore } from "@reduxjs/toolkit";
import productManager from "./components/Cart/productManager";
import filterManager from "./components/filterManager";

export const store = configureStore({
    reducer: { products: productManager, filters: filterManager }
});
