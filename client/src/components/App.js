import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing"
const Dashboard = () => <h2>Dashboar</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

//BrowserRauter y como un ViewRouter, solo puede tener un hijo,
//y éste a su vez tendrá las rutas y los componentes que mostrará
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//Connect(propsDefault,acciones)
export default connect(null, actions)(App);
