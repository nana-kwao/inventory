import authAPI from "./authService";

const loginService = async (userData) => {
  try {
    const { data } = await authAPI.post("/login", userData);
    if (data.success) {
      return data;
    }
    return JSON.stringify({ error: "Request Failed" });
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default loginService;
