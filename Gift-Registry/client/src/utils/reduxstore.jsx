import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';
import currentPageReducer from './pagesSlice';

const store = configureStore({
  reducer: {
    user: currentUserReducer, // Assign the slice reducer to a key in the state
    page: currentPageReducer,
  },
});

export default store;