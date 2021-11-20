import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GraphQLClient } from 'graphql-request';
import Home from "./Home";
import Account from "./Account";

const token = localStorage.getItem('TOKEN');
const client = new GraphQLClient(process.env.REACT_APP_API_URL || 'http://localhost:4000', {
  headers: {
    authorization: token ? `Bearer ${token}` : ''
  }
});

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Home client={client} />} />
        <Route exact path="/user/:token" render={(props) => <Account {...props} client={client} />} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch >
    </BrowserRouter>
  );
}