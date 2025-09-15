import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../store/UserSlice";
import { Outlet, useNavigate } from "react-router";
import DashboardTitleBar from "./DashboardTitleBar";
import DashboardMenuBar from "./DashboardMenubar";
import { setMenuItemText } from "../store/MenuSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { menuItemText } = useSelector((state) => state.Menu);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.User);
  if (!user) {
    navigate("/login");
  }

  //hide or show menu
  const handleMenuDisplay = (event) => {
    if (event) event.preventDefault();
    dispatch(setMenuItemText(!menuItemText));
  };

  return (
    <>
      <div
        className={`dashboard-container`}
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
          <div className="content-wrapper">
            <i
              onClick={handleMenuDisplay}
              className={`fa fa-regular fa-square-caret-${
                menuItemText ? "right" : "left"
              }`}
              style={{
                padding: "0.2rem",
                cursor: "pointer",
                fontSize: "20px",
              }}
            />
            {user && (
              <div className="content-data">
                <Outlet />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
