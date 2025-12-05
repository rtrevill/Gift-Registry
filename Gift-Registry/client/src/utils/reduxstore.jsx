import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';

const store = configureStore({
  reducer: {
    user: currentUserReducer, // Assign the slice reducer to a key in the state
  },
});

export default store;