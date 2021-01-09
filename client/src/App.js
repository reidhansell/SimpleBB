import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Alert from "./components/Alert";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ExerciseMain from "./components/Exercise/ExerciseMain";
import AddExercise from "./components/Exercise/AddExercise";
import CreateExercise from "./components/Exercise/CreateExercise";
//import FoodMain  from "./components/Food/FoodMain";
//import HelpMain from "./components/Help/HelpMain";

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
          <Route path="/exercise">
            <ExerciseMain />
          </Route>
          <Route path="/addexercise">
            <AddExercise />
          </Route>
          <Route path="/createexercise">
            <CreateExercise />
          </Route>
          {/*<Route path="/food">
            <FoodMain />
          </Route>
          <Route path="/help">
            <HelpMain />
          </Route>*/}
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
