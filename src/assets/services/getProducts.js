import productAuthAPI from "./productAuthServices";

const getProductsService = async (userId) => {
  try {
    const { data } = await productAuthAPI.get(`/products?userid=${userId}`);
    return {
      success: true,
      data: data.data,
      message: " list available",
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
export default getProductsService;
