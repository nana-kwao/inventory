import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addProductAuthServices from "../services/addProductService";
import { productValidationSchema } from "../services/inputvalidation";

function AddProduct() {
  const { userid } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    creator: userid,
    sell_price: "",
    buy_price: "",
    total_quantity: "",
  });
  const dashboard = useNavigate();

  //handle user input
  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //handle reset
  const handleReset = () => {
    setUserData({
      name: "",
      sell_price: "",
      buy_price: "",
      total_quantity: "",
    });
  };

  //hide form
  const handleHideForm = (event) => {
    if (event) event.preventDefault();
    dashboard(`/dashboard/${userid}/products`);
  };

  const handleAddProduct = async (event) => {
    if (event) event.preventDefault();

    const { error } = productValidationSchema.validate(userData);
    if (error) return error.details[0].message;

    try {
      const data = await addProductAuthServices(userData);

      if (data.success === true) {
        console.log(data.data);
        setUserData({
          name: "",
          sell_price: "",
          buy_price: "",
          total_quantity: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          width: "fit-content !important",
          height: "fit-content !important",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1rem 1.5rem",
            margin: "0.5rem 0",
            borderRadius: "0.6em",
            width: "fit-content",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <span
              style={{
                marginRight: "1px",
                fontSize: "18px",
                cursor: "pointer",
              }}
              onClick={handleHideForm}
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <h2>Add Product</h2>
          <LoginForm onReset={handleReset} onSubmit={handleAddProduct}>
            <InputFieldWrapper>
              <input
                type="text"
                required
                name="name"
                id="name"
                value={userData.name}
                onChange={handleUserInputChange}
                placeholder="Product name"
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <input
                type="text"
                required
                name="sell_price"
                id="sell_price"
                value={userData.sell_price}
                onChange={handleUserInputChange}
                placeholder="Selling Price"
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <input
                type="text"
                name="buy_price"
                id="buy_price"
                value={userData.buy_price}
                onChange={handleUserInputChange}
                placeholder="Buy Price"
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <input
                type="number"
                required
                name="total_quantity"
                id="total_quantity"
                value={userData.total_quantity}
                onChange={handleUserInputChange}
                placeholder="Total Quantity in Stock"
              />
            </InputFieldWrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <Button
                type="reset"
                style={{ backgroundColor: "#ff000093", color: "#fff" }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "#0d8d1493", color: "#fff" }}
              >
                Add
              </Button>
            </div>
          </LoginForm>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
