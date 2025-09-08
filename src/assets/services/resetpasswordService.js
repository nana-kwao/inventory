import authAPI from "./authService";

const resetpasswordService = async (resettoken, password) => {
  try {
    const { data } = await authAPI.post(`/reset-password/${resettoken}`, password);
    if (data.success) return data;

    return JSON.stringify({ error: "Request failed" });
  } catch (error) {
    console.log("Password reset failed", error);
    throw error;
  }
};

export default resetpasswordService;
