import loginService from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dashboard = useNavigate();

  //show or hide password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (event) => {
    if (event) event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  // user data change
  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //send user data to server
  const handleLoginResponse = async (event) => {
    if (event) event.preventDefault();
    try {
      const data = await loginService(userData);
      if (data.success) {
        dashboard("/");
      }
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleLoginResponse}>
        <InputFieldWrapper>
          <i className="fa fa-envelope icon" />
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleUserInputChange}
            required
            placeholder="User email"
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <i className="fa fa-key icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={userData.password}
            onChange={handleUserInputChange}
            required
            placeholder="User password"
          />
          <i
            className={`fa  ${showPassword ? "fa-eye-slash" : "fa-eye"} show`}
            onClick={handleShowPassword}
          />
        </InputFieldWrapper>
        <Button type="submit" style={{ marginTop: "1rem" }}>
          Login
        </Button>
      </LoginForm>
    </>
  );
}

export default Login;
