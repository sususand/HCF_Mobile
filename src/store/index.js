import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";

const store = configureStore({
  reducer: rootReducer, // Pass your combined reducer here
  // Optionally add middleware, enhancers, and other configurations here
});

export default store;
