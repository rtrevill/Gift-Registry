import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
    name: "current_user",
    initialState: {name: "Silliness", invites: []},
    reducers: {
        updateuser: (state, action) => {
            let x = action.payload;
            state.name = x
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
        },
        removesingleinvite: (state, action) => {
            let invitescopy = [...state.invites]
            let indexnum = invitescopy.indexOf(action.payload)
            invitescopy.splice(indexnum, 1)
            state.invites = invitescopy;
        }
    }
})

export const { updateuser, toralph, toanyone, updateInvites, removesingleinvite} = currentUserSlice.actions;
export default currentUserSlice.reducer;