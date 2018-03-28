import React from "react";
import ReactDom from "react-dom";
//El provider component informa a el hijo cuando hay cambios en su prop store
import { Provider } from "react-redux";
//Metodos redux para crear el store que almacenará los datos iniciale de los componentes
import { createStore, applyMiddleware } from "redux";
//Componente raíz de todos los demás que se creen
import App from "./components/App";

import reducers from "./reducers";

const store = createStore(reducers , {}, applyMiddleware());
//Cada vez que el store cambie, el provider informará al hijo y a todos los componentes hijos del mismo
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
