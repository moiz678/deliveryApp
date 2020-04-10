import { combineReducers } from "redux";
import cartReducer from "./cartReducer"
import auth from "./auth";
export default combineReducers({ auth, cartReducer });
