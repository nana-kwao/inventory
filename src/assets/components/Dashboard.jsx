import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/UserSlice";
import { Link, Outlet } from "react-router";

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
      {user && <Link to={"/dashboard/products"}>Products</Link>}
      <div>
        {" "}
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
