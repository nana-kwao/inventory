import logoutService from "../services/logoutService";
import { useNavigate } from "react-router";

function Logout() {
  const dashboard = useNavigate();

  const handleLogoutClick = async (event) => {
    if (event) event.preventDefault();
    try {
      const data = await logoutService();
      if (data.success) {
        dashboard("/login");
      }
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <>
      <button onClick={handleLogoutClick}>logout</button>
    </>
  );
}

export default Logout;
