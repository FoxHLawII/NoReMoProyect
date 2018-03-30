import { combineReducers } from "redux";
import {reducer as formRedux} from "redux-form";
import authReducer from "./authReducer";

//Cada reducer guarda el estado de sus variables en el key
export default combineReducers({
    auth: authReducer,
    form:formRedux
});