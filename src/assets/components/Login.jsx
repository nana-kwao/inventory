import loginService from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";
import { loginValidationSchema } from "../services/inputvalidation";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setStatus,
  setMessage,
  resetMessage,
} from "../store/UserSlice";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dashboard = useNavigate();
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.User);

  const [showPassword, setShowPassword] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const _user = sessionStorage.getItem("user");
    if (_user) {
      dispatch(setUser(JSON.parse(_user)));
      dashboard("/dashboard");
    }
  }, [dashboard, dispatch]);

  const handleShowPassword = (event) => {
    if (event) event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginResponse = async (event) => {
    if (event) event.preventDefault();
    dispatch(resetMessage());

    const { error } = loginValidationSchema.validate(userData);
    if (error) {
      dispatch(setMessage(error.details[0].message));
      return;
    }

    dispatch(setStatus("loading"));

    try {
      const data = await loginService(userData);

      if (data?.success) {
        sessionStorage.setItem("user", JSON.stringify(data.data));
        dispatch(setUser(data.data));
        dispatch(setStatus("success"));
        dashboard("/dashboard");
      } else {
        dispatch(setStatus("error"));
        dispatch(setMessage(data?.message || "Error Logging in"));
        return;
      }
    } catch (error) {
      dispatch(setStatus("error"));
      dispatch(setMessage("Server error. Please try again later"));
      throw error; // not Error(error)
    }
  };

  return (
    <div>
      <h1>Welcome Back</h1>
      <h2>Login</h2>
      <p>See your growth and get support</p>

      <LoginForm onSubmit={handleLoginResponse}>
        <InputFieldWrapper className={`${message ? "input-error" : ""}`}>
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

        <InputFieldWrapper className={`${message ? "input-error" : ""}`}>
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
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} show`}
            onClick={handleShowPassword}
          />
        </InputFieldWrapper>

        <InputFieldWrapper style={{ justifyContent: "space-between" }}>
          <input type="checkbox" style={{ width: "11px" }} />
          <span style={{ fontSize: "14px", marginLeft: "-2.5rem" }}>
            remember me!
          </span>
          <Link to="/forgot-password" style={{ fontSize: "14px" }}>
            Forgot password?
          </Link>
        </InputFieldWrapper>

        {message && <p className="error-text">{message}</p>}

        <Button
          type="submit"
          style={{ marginTop: "1rem" }}
          disabled={status === "loading" ? true : false}
        >
          {status === "loading" ? "...loading" : "Login"}
        </Button>
      </LoginForm>

      <div style={{ marginTop: "3rem" }}>
        <p>
          No account yet? <Link to="/signup">signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
