import signupService from "../services/signupService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";
import { Link } from "react-router-dom";
import { signupValidationSchema } from "../services/inputvalidation";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setStatus,
  setMessage,
  resetMessage,
} from "../store/UserSlice";

function Signup() {
  const [userData, setUserData] = useState({
    business: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const dashboard = useNavigate();
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.User);

  // Check if already logged in
  useEffect(() => {
    const _user = sessionStorage.getItem("user");
    if (_user) {
      dispatch(setUser(JSON.parse(_user)));
      dashboard("/dashboard");
    }
  }, [dashboard, dispatch]);

  // Show or hide password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (event) => {
    if (event) event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  // User data change
  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Send user data to server
  const handleSignupResponse = async (event) => {
    if (event) event.preventDefault();
    dispatch(resetMessage());

    const { error } = signupValidationSchema.validate(userData);
    if (error) {
      dispatch(setMessage(error.details[0].message));
      return;
    }

    dispatch(setStatus("loading"));

    try {
      const data = await signupService(userData);

      if (data?.success) {
        sessionStorage.setItem("user", JSON.stringify(data.data));
        dispatch(setUser(data.data));
        dispatch(setStatus("success"));
        dashboard("/dashboard");
      } else {
        dispatch(setStatus("error"));
        dispatch(setMessage(data?.message || "Error Signing up"));
        return;
      }
    } catch (error) {
      dispatch(setStatus("error"));
      dispatch(setMessage("Server error. Please try again later"));
      throw error;
    }
  };

  return (
    <>
      <div>
        <h1>Get Started</h1>
        <h2>Signup</h2>
        <p>See your growth and get support</p>

        <LoginForm onSubmit={handleSignupResponse}>
          <InputFieldWrapper className={`${message ? "input-error" : ""}`}>
            <i className="fa fa-briefcase icon" />
            <input
              type="text"
              name="business"
              id="business"
              value={userData.business.toUpperCase()}
              onChange={handleUserInputChange}
              required
              placeholder="Business name"
            />
          </InputFieldWrapper>

          <InputFieldWrapper className={`${message ? "input-error" : ""}`}>
            <i className="fa fa-person icon" />
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name.toLowerCase()}
              onChange={handleUserInputChange}
              required
              placeholder="User name"
            />
          </InputFieldWrapper>

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
            <i className="fa fa-phone icon" />
            <input
              type="tel"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={handleUserInputChange}
              required
              placeholder="Telephone"
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

          <InputFieldWrapper>
            <input type="checkbox" style={{ width: "11px" }} required />
            <span style={{ fontSize: "12.5px", marginLeft: "0.5rem" }}>
              <Link to={"terms"}>I agree to all terms and conditions</Link>
            </span>
          </InputFieldWrapper>

          {message && <p className="error-text">{message}</p>}

          <Button
            type="submit"
            style={{ marginTop: "1rem" }}
            disabled={status === "loading"}
          >
            {status === "loading" ? "...loading" : "Signup"}
          </Button>
        </LoginForm>

        <div style={{ marginTop: "3rem" }}>
          <p>
            Have an account? <Link to={"/login"}>login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
