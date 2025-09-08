import signupService from "../services/signupService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";
import { Link } from "react-router-dom";
import { signupValidationSchema } from "../services/inputvalidation";

function Signup() {
  const [userData, setUserData] = useState({
    business: "",
    name: "",
    email: "",
    phone: "",
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
  const handleSignupResponse = async (event) => {
    if (event) event.preventDefault();
    setError("");

    const { error } = signupValidationSchema.validate(userData);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    try {
      const data = await signupService(userData);
      if (data.success) {
        dashboard("/");
      }
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <>
      <div>
        <h1>Get Started</h1>
        <h2>Signup</h2>
        <p>See your growth and get support</p>
        <LoginForm onSubmit={handleSignupResponse}>
          <InputFieldWrapper className={`${error ? "input-error" : ""}`}>
            <i className="fa fa-briefcase icon" />
            <input
              type="text"
              name="business"
              id="business"
              value={userData.business.toLocaleUpperCase()}
              onChange={handleUserInputChange}
              required
              placeholder="Business name"
            />
          </InputFieldWrapper>
          <InputFieldWrapper className={`${error ? "input-error" : ""}`}>
            <i className="fa fa-person icon" />
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name.toLocaleLowerCase()}
              onChange={handleUserInputChange}
              required
              placeholder="User name"
            />
          </InputFieldWrapper>
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
              justifyContent: "",
            }}
          >
            <input type="checkbox" style={{ width: "11px" }} required />
            <span style={{ fontSize: "12.5px", marginLeft: "0.5rem" }}>
              <Link to={"terms"}>I agree to all terms and conditions</Link>
            </span>
          </InputFieldWrapper>

          {error && <p className="error-text">{error}</p>}

          <Button type="submit" style={{ marginTop: "1rem" }}>
            Signup
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
