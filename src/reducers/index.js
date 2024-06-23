import { combineReducers } from "redux";
import routeReducer from "./routeReducer";

const rootReducer = combineReducers({
  items: routeReducer,
});

export default rootReducer;
