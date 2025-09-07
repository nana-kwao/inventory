import "./App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
      <Link to={"/signup"}>
        <button>Signup</button>
      </Link>
    </>
  );
}

export default App;
