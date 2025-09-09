import authAPI from "./authService";

const forgotpasswordService = async (email) => {
  try {
    const { data } = await authAPI.post("/forgot-password", email);
    return {
      success: true,
      data: data.data,
      message: "message sent successfully",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong message send";
    return {
      success: false,
      data: null,
      message,
    };
  }
};

export default forgotpasswordService;
