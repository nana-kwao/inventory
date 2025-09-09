import { useSelector } from "react-redux";
import Logout from "./Logout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/UserSlice";

function Dashboard() {
  const dispatch = useDispatch();

  // Check if already logged in
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.User);

  return (
    <>
      {user && (
        <div>
          <p>Id : {user.id}</p>
          <p>UUID: {user.uuid}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          <p>Business Name: {user.business}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      <Logout />
    </>
  );
}

export default Dashboard;
