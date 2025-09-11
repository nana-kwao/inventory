import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../store/UserSlice";
import { Outlet } from "react-router";
import DashboardTitleBar from "./DashboardTitleBar";
import DashboardMenuBar from "./DashboardMenubar";
import { setMenuItemText } from "../store/MenuSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { menuItemText } = useSelector((state) => state.Menu);

  // Check if already logged in
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.User);

  //hide or show menu
  const handleMenuDisplay = (event) => {
    if (event) event.preventDefault();
    dispatch(setMenuItemText(!menuItemText));
  };

  return (
    <>
      <div
        className={`dashboard-container ${
          menuItemText ? "resize-dashboard" : ""
        }`}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          gap: "0.2rem",
          alignItems: "start",
        }}
      >
        {/* menu bar */}
        <DashboardMenuBar />

        {/* main content */}
        <div
          className="main-content"
          style={{
            width: "100% !important",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          {/* title bar*/}
          <DashboardTitleBar />

          {/* outlets */}
          <div
            className="content-wrapper"
            style={{
              width: "100% !important",
              height: "auto",
              position: "relative",
            }}
          >
            <i
              onClick={handleMenuDisplay}
              className={`fa fa-regular fa-square-caret-${
                menuItemText ? "right" : "left"
              }`}
              style={{
                padding: "0.2rem",
                cursor: "pointer",
              }}
            />
            {user && <Outlet />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
