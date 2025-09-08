import authAPI from "./authService";

const forgotpasswordService = async (email) => {
  try {
    const { data } = await authAPI.post("/forgot-password", email);
    if (data.success) return data;

    return JSON.stringify({ error: "Request failed" });
  } catch (error) {
    console.log("Error occured", error);
    throw error;
  }
};

export default forgotpasswordService;
