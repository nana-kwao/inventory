import productAuthAPI from "./productAuthServices";

const addProductAuthServices = async (userData) => {
  try {
    const { data } = await productAuthAPI.post("/add-product", userData);
    return {
      success: true,
      data: data.data,
      message: "Product created",
    };
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong during product creation";

    console.log(error);
    return {
      success: false,
      data: null,
      message,
    };
  }
};

export default addProductAuthServices;
