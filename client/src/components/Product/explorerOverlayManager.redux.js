import { createSlice } from "@reduxjs/toolkit";

//<redux>
const initialState = {
    value: false
};

export const mediaExplorer = createSlice({
    name: "explorer",
    initialState,
    reducers: {
        show: (state) => {
            state.value = !state.value;
        }
        // decrement: (state) => {
        //     state.value -= 1;
        // }
    }
});
//</redux>

export const { show } = mediaExplorer.actions;
export default mediaExplorer.reducer;
