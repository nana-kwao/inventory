import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [userData, setUserData] = useState({
    name: "",
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
    dashboard("/dashboard/products");
  };

  return (
    <>
      <div
        style={{
          width: "100% !important",
          height: "100% !important",
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
          <LoginForm onReset={handleReset}>
            <InputFieldWrapper>
              <input
                type="text"
                required
                name="name"
                id="name"
                value={userData.name.toUpperCase().trimStart()}
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
