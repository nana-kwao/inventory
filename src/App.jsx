import Login from "./assets/components/Login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./assets/store/UserSlice";
import { useEffect } from "react";
import Dashboard from "./assets/components/Dashboard";

function App() {
  const dispatch = useDispatch();

  //get user from
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.User);
  return <>{user ? <Dashboard /> : <Login />}</>;
}

export default App;
