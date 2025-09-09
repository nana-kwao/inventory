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
  const [status, setStatus] = useState("");

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //send user data to server
  const handleForgetPasswordResponse = async (event) => {
    if (event) event.preventDefault();
    setError("");

    sessionStorage.removeItem("user");

    const { error } = forgotPasswordValidationSchema.validate(userData);
    if (error) {
      setError(error.details[0].message);
      return;
    }
    setStatus("loading");
    try {
      const data = await forgotpasswordService(userData);
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
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
            {status === "loading" ? "...loading" : "Submit"}
          </Button>
        </LoginForm>

        <div style={{ marginTop: "3rem" }}>
          <Link to={"/login"}>Go back to Login</Link>
        </div>

        {status && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              {status === "sucess"
                ? "Reset Link sent to your email. Kindly check"
                : status === "error"
                ? "Sorry. Try a valid email"
                : ""}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ForgotPassword;
