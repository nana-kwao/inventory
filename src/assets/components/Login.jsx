import loginService from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";
import { loginValidationSchema } from "../services/inputvalidation";
import { Link } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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
    setError("");

    const { error } = loginValidationSchema.validate(userData);
    if (error) {
      setError(error.details[0].message);
      return;
    }
    try {
      const data = await loginService(userData);
      if (data.success) {
        dashboard("/dashboard");
      }
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <>
      <div>
        <h1>Welcome Back</h1>
        <h2>Login</h2>
        <p>See your growth and get support</p>
        <LoginForm onSubmit={handleLoginResponse}>
          <InputFieldWrapper className={`${error ? "input-error" : ""}`}>
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
          <InputFieldWrapper className={`${error ? "input-error" : ""}`}>
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
          <InputFieldWrapper
            style={{
              justifyContent: "space-between",
            }}
          >
            <input type="checkbox" style={{ width: "0.8rem" }} />
            <span style={{ fontSize: "14px", marginLeft: "-2.5rem" }}>
              remember me!
            </span>
            <Link to={"/forgot-password"} style={{ fontSize: "14px " }}>
              Forgot password?
            </Link>
          </InputFieldWrapper>

          {error && <p className="error-text">{error}</p>}

          <Button type="submit" style={{ marginTop: "1rem" }}>
            Login
          </Button>
        </LoginForm>
        <div style={{ marginTop: "3rem" }}>
          <p>
            No account yet? <Link to={"/signup"}>signup</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
