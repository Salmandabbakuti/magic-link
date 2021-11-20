import { GraphQLClient } from 'graphql-request';
import Home from "./Home";
import Account from "./Account";

const tokenParam = new URL(window.location.href).searchParams.get('token');
const token = tokenParam || localStorage.getItem('TOKEN') || '';
tokenParam && localStorage.setItem('TOKEN', token);

const client = new GraphQLClient(process.env.REACT_APP_API_URL || 'http://localhost:4000', {
  headers: {
    authorization: token ? `Bearer ${token}` : ''
  }
});

export default function App() {
  return (
    <>
      {token ? <Account client={client} /> : <Home client={client} />}
    </>
  );
}