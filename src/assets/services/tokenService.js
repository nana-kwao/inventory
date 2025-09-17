import authAPI from "./authService";

const refreshtoken = sessionStorage.getItem("refreshtoken");

const getNewToken = async () => {
  try {
    const { data } = await authAPI.post("/refresh", {
      refreshtoken,
    });
    const newAccessToken = data.data.tokenInfo.accesstoken;
    sessionStorage.setItem("accesstoken", newAccessToken);
    return {
      success: true,
      message: "token refreshed",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong during token refresh";

    console.log(error);
    return {
      success: false,
      message,
    };
  }
};

export default getNewToken;
