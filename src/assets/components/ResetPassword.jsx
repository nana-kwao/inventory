import resetpasswordService from "../services/resetpasswordService";
import { useState } from "react";
import { resetPasswordValidationSchema } from "../services/inputvalidation";
import { useParams, useNavigate } from "react-router";
import { LoginForm, InputFieldWrapper, Button } from "milesuicomponents";

function ResetPassword() {
  const [userData, setUserData] = useState({ password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { resettoken } = useParams();
  const dashboard = useNavigate();

  //show or hide password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (event) => {
    if (event) event.preventDefault();
    setShowPassword((prev) => !prev);
  };

  //confirm password

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  //send user data to server
  const handleForgetPasswordResponse = async (event) => {
    event.preventDefault();
    setError("");

    const { error } = resetPasswordValidationSchema.validate(userData);
    if (error) {
      setError(error.details[0].message);
      return;
    }

    if (userData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = await resetpasswordService(resettoken, userData);
      if (data.success) {
        dashboard("/login");
      }
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Reset Password</h2>
        <p>Enter new password</p>
      </div>
      <LoginForm onSubmit={handleForgetPasswordResponse}>
        <InputFieldWrapper className={error ? "input-error" : ""}>
          <i className="fa fa-key icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={userData.password}
            onChange={handleUserInputChange}
            required
            placeholder="New password"
          />
          <i
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} show`}
            onClick={handleShowPassword}
          />
        </InputFieldWrapper>

        <InputFieldWrapper className={error ? "input-error" : ""}>
          <i className="fa fa-key icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            placeholder="Confirm password"
          />
          <i
            className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} show`}
            onClick={handleShowPassword}
          />
        </InputFieldWrapper>

        {error && <p className="error-text">{error}</p>}

        <Button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </Button>
      </LoginForm>
    </>
  );
}

export default ResetPassword;
