import logoutService from "../services/logoutService";
import { useNavigate } from "react-router-dom";
import { resetUser, setMessage, resetMessage } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function Logout() {
  const dashboard = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.User);

  const handleLogoutClick = async (event) => {
    if (event) event.preventDefault();
    dispatch(resetMessage());

    try {
      const data = await logoutService();
      if (data.success) {
        sessionStorage.removeItem("user");
        dispatch(resetUser());
        dispatch(setMessage("Logged out Successful"));
        dashboard("/login");
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
      <p onClick={handleLogoutClick}>logout</p>
      {message && alert(message)}
    </>
  );
}

export default Logout;
