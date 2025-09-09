import authAPI from "./authService";

const loginService = async (userData) => {
  try {
    const { data } = await authAPI.post("/login", userData);
    return {
      success: true,
      data: data.data,
      message: "Login successful",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong during login";
    return {
      success: false,
      data: null,
      message,
    };
  }
};

export default loginService;
