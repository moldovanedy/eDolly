import { createSlice } from "@reduxjs/toolkit";

//#region redux
const initialState = {
    sortingRule: "",
    productsPerPage: 0
};

export const filterManager = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changeSortingRule: (state, action) => {
            state.sortingRule = action.payload;
        },
        setProductsPerPage: (state, action) => {
            state.productsPerPage = action.payload;
        }
    }
});
//#endregion

export const { changeSortingRule, setProductsPerPage } = filterManager.actions;

export default filterManager.reducer;
