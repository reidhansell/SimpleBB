import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Alert from "./components/Alert";
import Login from "./components/Login";
import Register from "./components/Register";
import ActivityMain from "./components/Activity/ActivityMain";
import { DietMain } from "./components/Diet/DietMain";
import { HelpMain } from "./components/Help/HelpMain";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Alert />
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/activity">
            <ActivityMain />
          </Route>
          <Route path="/diet">
            <DietMain />
          </Route>
          <Route path="/help">
            <HelpMain />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
