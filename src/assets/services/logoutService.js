import authAPI from "./authService";

const logoutService = async () => {
  try {
    const { data } = await authAPI.post("/logout");
    if (data.success) return data;

    return JSON.stringify({ error: "Request failed" });
  } catch (error) {
    console.log("Logout failed", error);
    throw error;
  }
};

export default logoutService;
