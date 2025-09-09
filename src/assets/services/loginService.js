import authAPI from "./authService";

const loginService = async (userData) => {
  try {
    const { data } = await authAPI.post("/login", userData);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default loginService;
