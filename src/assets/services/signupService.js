import authAPI from "./authService.js";

const signupService = async (userData) => {
  try {
    const { data } = await authAPI.post("/signup", userData);
    if (data.success) {
      return data;
    }
    return JSON.stringify({ error: "Request Failed" });
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export default signupService;
