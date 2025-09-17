import axios from "axios";

const refreshAPI = axios.create({
  baseURL: "https://inventory-server-tmqz.onrender.com/api/dashboard",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshtoken = sessionStorage.getItem("refreshtoken");

const getNewToken = async () => {
  try {
    const { data } = await refreshAPI.post("/refresh", {
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
