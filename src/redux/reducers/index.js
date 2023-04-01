import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  categories: categoryReducer,
  auth:authReducer,
  order:orderReducer

});
