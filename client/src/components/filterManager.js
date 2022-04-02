import { createSlice } from "@reduxjs/toolkit";

//#region redux
const initialState = {
    availability: "",
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 1,
    maxRating: 5
};

export const filterManager = createSlice({
    name: "filters",
    initialState,
    reducers: {
        changeAvailability: (state, action) => {
            state.availability = action.payload;
        },
        setMinPrice: (state, action) => {
            state.minPrice = action.payload;
        },
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload;
        },
        setMinRating: (state, action) => {
            state.minRating = action.payload;
        },
        setMaxRating: (state, action) => {
            state.maxRating = action.payload;
        }
    }
});
//#endregion

export const {
    changeAvailability,
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setMaxRating
} = filterManager.actions;

export default filterManager.reducer;
