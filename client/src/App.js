import { BrowserRouter } from "react-router-dom";
import { GraphQLClient, gql } from 'graphql-request';
import Routes from "./routes/Routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}