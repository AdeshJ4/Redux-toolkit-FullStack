import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerDetailsSlice";
// import movieReducer from './slices/movieDetailsSlice';

const store = configureStore({
  reducer: {
    customers: customerReducer,
    // movies: movieReducer
  },
});
export default store;
