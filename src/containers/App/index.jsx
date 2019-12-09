import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from "../../components/Header";

import Login from "../Login";

export default () => (
  <Router>
    <React.StrictMode>
      <Header title={"Account"} />
      <div className="page_container">
        <Switch>
          <Route exact path="/signin" component={Login} />
          <Redirect to="/signin" />
        </Switch>
      </div>
    </React.StrictMode>
  </Router>
);
