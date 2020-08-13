import { combineReducers } from "redux";
import TodoReducer from "./TodoReducer";
import UserReducer from "./UserReducer";

export default combineReducers({ TodoReducer, UserReducer });
