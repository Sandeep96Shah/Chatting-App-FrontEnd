import { combineReducers } from "redux";
import friends from './friends';
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
    friends,
    messages,
    auth,
})