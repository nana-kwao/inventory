import "./App.css";
import Login from "./assets/components/Login";
import { useDispatch } from "react-redux";
import { setUser } from "./assets/store/UserSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  //get user from
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
  return (
    <>
      <Login />
    </>
  );
}

export default App;
