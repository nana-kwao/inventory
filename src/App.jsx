import "./App.css";
import { Link } from "react-router";
import Logout from "./assets/components/Logout";

function App() {
  return (
    <>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
      <Link to={"/signup"}>
        <button>Signup</button>
      </Link>
      <Link to={"/forgot-password"}>
        <button>Forgot Password</button>
      </Link>
      <Logout />
    </>
  );
}


export default App;
