import productAuthAPI from "./productAuthServices";

const addStockAuthServices = async (userData) => {
  try {
    const { data } = await productAuthAPI.post("/add-stock", userData);
    return {
      success: true,
      data: data.data,
      message: "Stock created",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong during stock creation";

    console.log(error);
    return {
      success: false,
      data: null,
      message,
    };
  }
};

export default addStockAuthServices;
