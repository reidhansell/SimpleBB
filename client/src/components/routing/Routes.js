import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Tracker from "../tracker/Tracker";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import Alert from "../layout/Alert";
import { Container } from "reactstrap";

const Routes = () => {
  return (
    <div className="p-0">
      <Alert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/tracker" component={Tracker} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
