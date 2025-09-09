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
    throw error;
  }
};

export default loginService;
