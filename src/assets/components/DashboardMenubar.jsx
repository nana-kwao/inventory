import Logout from "./Logout";
import { Link, NavLink } from "react-router";
import { useSelector} from "react-redux";

function DashboardMenuBar() {
  const { menuItemText } = useSelector((state) => state.Menu);


  return (
    <>
      <div className={`menu-bar ${menuItemText ? "hide-menu" : ""}`}>
        <div className="logo-wrapper">
          <Link to={"/dashboard"}>
            <p>Inventory</p>
          </Link>
        </div>
        <div className="menu-bar-items">
          <NavLink
            to={"/dashboard/overview"}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-home" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>
              Overview
            </span>
          </NavLink>
          <NavLink

            to={"/dashboard/products"}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa-solid fa-list-ul" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>
              Products
            </span>
          </NavLink>
          <NavLink

            to={"/dashboard/stocks"}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-home" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>Stocks</span>
          </NavLink>
          <NavLink

            to={"/dashboard/order"}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-home" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>Order</span>
          </NavLink>
          <NavLink

            to={"/dashboard/report"}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-home" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>Report</span>
          </NavLink>
        </div>
        <div className="settings-wrapper">
          <NavLink

            to={"/dashboard/settings"}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-gear" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>
              Settings
            </span>
          </NavLink>
          <Logout />
        </div>
      </div>
    </>
  );
}

export default DashboardMenuBar;
