import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Tracker from "../tracker/Tracker";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import Alert from "../layout/Alert";
import { Container } from "reactstrap";
import BootStrapNav from "../layout/BootStrapNav";

const Routes = () => {
  return (
    <Container fluid={true} className="p-0 m-0">
      <BootStrapNav />
      <Alert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/tracker" component={Tracker} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
};

export default Routes;
