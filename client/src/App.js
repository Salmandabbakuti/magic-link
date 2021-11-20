import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Account from "./Account";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:token" component={Account} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch >
    </BrowserRouter>
  );
}