import authAPI from "./authService";

const resetpasswordService = async (resettoken, password) => {
  try {
    const { data } = await authAPI.post(
      `/reset-password?resettoken=${resettoken}`,
      password
    );
    return {
      success: true,
      data: data.data,
      message: " reset successful",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong during reset";
    return {
      success: false,
      data: null,
      message,
    };
  }
};

export default resetpasswordService;
