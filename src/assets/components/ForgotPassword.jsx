import forgotpasswordService from "../services/forgotpasswordService";
import { useState } from "react";
import { LoginForm, InputFieldWrapper, Button } from "milesuicomponents";
import { forgotPasswordValidationSchema } from "../services/inputvalidation";
import { Link } from "react-router";

function ForgotPassword() {
  const [userData, setUserData] = useState({
    email: "",
  });
  const [error, setError] = useState("");

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //send user data to server
  const handleForgetPasswordResponse = async (event) => {
    if (event) event.preventDefault();
    setError("");

    const { error } = forgotPasswordValidationSchema.validate(userData);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    try {
      const data = await forgotpasswordService(userData);
      if (data.success) {
        alert("Reset Link Sent");
      }
    } catch (error) {
      throw Error(error);
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Reset Password</h2>
          <p>Enter your email</p>
        </div>
        <LoginForm onSubmit={handleForgetPasswordResponse}>
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

          {error && <p className="error-text">{error}</p>}

          <Button type="submit" style={{ marginTop: "1rem" }}>
            Submit
          </Button>
        </LoginForm>

        <div style={{ marginTop: "3rem" }}>
          <Link to={"/login"}>Go back to Login</Link>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
