import { useSelector } from "react-redux";
import Logout from "./Logout";

function Dashboard() {
  const { user } = useSelector((state) => state.User);

  return (
    <>
      <div>
        <p>Id : {user.id}</p>
        <p>UUID: {user.uuid}</p>
        <p>Email: {user.email}</p>
        <p>Name: {user.name}</p>
        <p>Business Name: {user.business}</p>
        <p>Phone: {user.phone}</p>
      </div>
      <Logout />
    </>
  );
}

export default Dashboard;
