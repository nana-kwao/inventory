import authAPI from "./authService.js";

const signupService = async (userData) => {
  try {
    const { data } = await authAPI.post("/signup", userData);
    return {
      success: true,
      data: data.data,
      message: "Signup successful",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong during signup";
    return {
      success: false,
      data: null,
      message,
    };
  }
};

export default signupService;
