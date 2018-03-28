import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";

const Dashboard = () => <h2>Dashboar</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

//BrowserRauter y como un ViewRouter, solo puede tener un hijo, 
//y éste a su vez tendrá las rutas y los componentes que mostrará
const App = () => {
  return (
    <div class="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard}/>
          <Route path="/surveys/new" component={SurveyNew}/>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
