import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

export default function App(props) {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}