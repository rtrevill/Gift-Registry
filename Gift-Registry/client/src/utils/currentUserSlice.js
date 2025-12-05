import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
    name: "current_user",
    initialState: {name: "Silliness", invites: []},
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
        },
        updateInvites: (state, action) => {
            const updatedArray = action.payload
            state.invites = updatedArray;
        }
    }
})

export const { updateuser, toralph, toanyone, updateInvites} = currentUserSlice.actions;
export default currentUserSlice.reducer;