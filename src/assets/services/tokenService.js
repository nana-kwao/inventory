import productAuthAPI from "./productAuthServices";

// get refresh token
const refreshtoken = sessionStorage.getItem("refreshtoken");

const getNewToken = async () => {
  try {
    const { data } = await productAuthAPI.post("/refresh", refreshtoken);
    const newAccessToken = data.data.tokenInfo.accesstoken;
    sessionStorage.setItem("accesstoken", newAccessToken);
    return {
      success: true,
      message: "token refreshed",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong during product creation";

    console.log(error);
    return {
      success: false,
      message,
    };
  }
};

export default getNewToken;
