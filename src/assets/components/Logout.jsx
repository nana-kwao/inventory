import logoutService from "../services/logoutService";
import { useNavigate } from "react-router-dom";
import { resetUser, setMessage, resetMessage } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "milesuicomponents";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.User);
  const { menuItemText } = useSelector((state) => state.Menu);

  const handleLogoutClick = async (event) => {
    if (event) event.preventDefault();
    dispatch(resetMessage());

    try {
      const data = await logoutService();
      if (data.success) {
        sessionStorage.removeItem("user");
        dispatch(resetUser());
        dispatch(setMessage("Logged out Successful"));
        navigate("/login", { replace: true });
      } else {
        dispatch(setMessage(data.message || "Failed to logout"));
      }
    } catch (error) {
      dispatch(setMessage("Server Error"));
      throw Error(error);
    }
  };

  return (
    <>
      <Button onClick={handleLogoutClick} style={{width: "fit-content"}}>
        <i className="fa-solid fa-right-from-bracket"></i> {""}
        <span className={`${menuItemText ? "hide-menu" : "show-menu"}`}>
          logout
        </span>
      </Button>
      {message && alert(message)}
    </>
  );
}

export default Logout;
