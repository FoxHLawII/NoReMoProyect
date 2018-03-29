import "materialize-css/dist/css/materialize.min.css";

import React from "react";
import ReactDom from "react-dom";
//El provider component informa a el hijo cuando hay cambios en su prop store
import { Provider } from "react-redux";
//Metodos redux para crear el store que almacenará los datos iniciale de los componentes
import { createStore, applyMiddleware } from "redux";

import reduxThunk from "redux-thunk";
//Componente raíz de todos los demás que se creen
import App from "./components/App";

import reducers from "./reducers";
const axios=require("axios");
window.axios=axios;
//El store de redux necesita los reducers (combineReducers) donde se incluirán todos los reducers
//Y el applyMiddleware es un intermediario en la peticon que recibe un reduxThunk 
//Que interviene cuando se le devuelve una función desde una acción y le paa un dspatcher
//con el fin de actualizar los reducers y con ello los componentes
const store = createStore(reducers , {}, applyMiddleware(reduxThunk));

//Cada vez que el store cambie, el provider informará al hijo y a todos los componentes hijos del mismo
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
