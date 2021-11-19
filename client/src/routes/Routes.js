import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../Home";
import Account from "../Account";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Routes = () => {
  return (
    <Switch>
      <PublicRoute restricted={false} exact path="/" component={Home} />
      <Route exact path="/user/:token" component={Account} />
      <Route render={() => <h1>Not Found</h1>} />
    </Switch >
  )
}
export default Routes;