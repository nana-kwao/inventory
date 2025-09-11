import { InputFieldWrapper } from "milesuicomponents";
import { useSelector } from "react-redux";
import { Link } from "react-router";

function DashboardTitleBar() {
  const { menuItemText } = useSelector((state) => state.Menu);
  return (
    <>
      <div className="dashboard-title-bar" style={{ display: "flex" }}>
        <Link
          to={"/dashboard"}
          className={`${menuItemText ? "show-item" : "hide-menu"}`}
          style={{}}
        >
          <p>Inventory</p>
        </Link>
        <div className="search-wrapper">
          <InputFieldWrapper>
            <input
              type="seach"
              name="search"
              className={`${menuItemText ? "hide-menu" : ""}`}
              placeholder="search inventory"
            />
            <i className={`fa fa-search ${menuItemText ? "" : "show"}`} />
          </InputFieldWrapper>
        </div>
        <div className="profile-wrapper">
          <i className="fa fa-regular fa-bell" />
          <div className="profile">
            <i className="fa-regular fa-user" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardTitleBar;
