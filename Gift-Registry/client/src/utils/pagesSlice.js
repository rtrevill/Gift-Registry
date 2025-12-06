import { createSlice } from "@reduxjs/toolkit";

const currentPageSlice = createSlice({
    name: "current_page",
    initialState: {page: "Landing"},
    reducers: {
        updatepage: (state, action) => {
            const x = action.payload;
            state.page = x;
        }
    }
});

export const { updatepage } = currentPageSlice.actions;
export default currentPageSlice.reducer;