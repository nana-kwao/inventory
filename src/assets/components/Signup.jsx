import signupService from "../services/signupService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";

function Signup() {
  const [userData, setUserData] = useState({
    business: "",
    name: "",
    email: "",
    phone: "",
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
  const handleSignupResponse = async (event) => {
    if (event) event.preventDefault();
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
      <LoginForm onSubmit={handleSignupResponse}>
        <InputFieldWrapper>
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
        <InputFieldWrapper>
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
          Signup
        </Button>
      </LoginForm>
    </>
  );
}

export default Signup;
