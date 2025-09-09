import authAPI from "./authService";

const loginService = async (userData) => {
  try {
    const { data } = await authAPI.post("/login", userData);
    return {
      success: data.sucsess,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      data: null,
      message: error.data.data.message || "Server error. Try again later",
    };
  }
};

export default loginService;
