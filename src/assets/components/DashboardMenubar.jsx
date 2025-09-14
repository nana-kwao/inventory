import Logout from "./Logout";
import { Link, NavLink, useParams } from "react-router";
import { useSelector } from "react-redux";

function DashboardMenuBar() {
  const { menuItemText } = useSelector((state) => state.Menu);
  const { userid } = useParams();

  return (
    <>
      <div className={`menu-bar ${menuItemText ? "hide-menu" : ""}`}>
        <div className="logo-wrapper">
          <Link to={`/dashboard/${userid}`}>
            <p className="logo">Inventory</p>
          </Link>
        </div>
        <div className="menu-bar-items">
          <NavLink
            to={`/dashboard/${userid}/overview`}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-home" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>
              Overview
            </span>
          </NavLink>
          <NavLink
            to={`/dashboard/${userid}/products`}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa-solid fa-archive" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>
              Products
            </span>
          </NavLink>
          <NavLink
            to={`/dashboard/${userid}/stocks`}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-list-ol" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>Stocks</span>
          </NavLink>
          <NavLink
            to={`/dashboard/${userid}/order`}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-shopping-cart" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>Order</span>
          </NavLink>
          <NavLink
            to={`/dashboard/${userid}/report`}
            className={({ isActive }) => (isActive ? "menu-active" : "")}
          >
            <i className="fa fa-book" /> {""}
            <span className={`${menuItemText ? "hide-menu" : ""}`}>Report</span>
          </NavLink>
        </div>
        <div className="settings-wrapper">
          <NavLink
            to={`/dashboard/${userid}/settings`}
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
