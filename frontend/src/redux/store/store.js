import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../slices/userDetailsSlice";

const store = configureStore({
  reducer: {
    user: userDetail,
  },
});
export default store;
