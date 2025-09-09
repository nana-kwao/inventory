import authAPI from "./authService";

const logoutService = async () => {
  try {
    const { data } = await authAPI.post("/logout");
    return {
      success: true,
      data: data.data,
      message: "Logout successful",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong during logout";
    return {
      success: false,
      data: null,
      message,
    };
  }
};

export default logoutService;
