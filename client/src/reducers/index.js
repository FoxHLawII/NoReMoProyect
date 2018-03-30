import { combineReducers } from "redux";
import {reducer as formRedux} from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

//Cada reducer guarda el estado de sus variables en el key
export default combineReducers({
    surveys: surveysReducer,
    auth: authReducer,
    form:formRedux
});