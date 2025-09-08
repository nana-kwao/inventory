import forgotpasswordService from "../services/forgotpasswordService";
import { useState } from "react";
import { LoginForm, InputFieldWrapper, Button } from "milesuicomponents";

function ForgotPassword() {
  const [userData, setUserData] = useState({
    email: "",
  });

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //send user data to server
  const handleForgetPasswordResponse = async (event) => {
    if (event) event.preventDefault();
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
      <LoginForm onSubmit={handleForgetPasswordResponse}>
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
        <Button type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </Button>
      </LoginForm>
    </>
  );
}

export default ForgotPassword;
