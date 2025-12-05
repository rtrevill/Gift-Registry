import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
    name: "current_user",
    initialState: {name: "Silliness"},
    reducers: {
        updateuser: (state, action) => {
            let x = action.payload;
            state.value = x
        },
        toralph: (state) => {
            let y = "Ralph"
            state.name = y
        },
        toanyone: (state, action) => {
            let z = action.payload
            state.name = z
        }
    }
})

export const { updateuser, toralph, toanyone} = currentUserSlice.actions;
export default currentUserSlice.reducer;