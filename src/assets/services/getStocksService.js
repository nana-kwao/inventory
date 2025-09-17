import productAuthAPI from "./productAuthServices";

const getStocksService = async (userId) => {
  try {
    const { data } = await productAuthAPI.get(`/stocks?userid=${userId}`);
    return {
      success: true,
      data: data.data,
      message: " list available",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong during request";
    return {
      success: false,
      data: null,
      message,
    };
  }
};
export default getStocksService;
