import { InputFieldWrapper, LoginForm, Button } from "milesuicomponents";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addStockAuthServices from "../services/addStockService";
import { stockValidationSchema } from "../services/inputvalidation";
import { useSelector } from "react-redux";

function AddStock() {
  const { products } = useSelector((state) => state.Products);
  const { userid } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    creator: userid,
    sell_price: "",
    buy_price: "",
    added_quantity: "",
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
      added_quantity: "",
    });
  };

  //hide form
  const handleHideForm = (event) => {
    if (event) event.preventDefault();
    dashboard(`/dashboard/${userid}/stocks`);
  };

  const handleAddStock = async (event) => {
    if (event) event.preventDefault();

    const { error } = stockValidationSchema.validate(userData);
    console.log(error);
    if (error) return error.details[0].message;

    try {
      const data = await addStockAuthServices(userData);

      if (data.success === true) {
        setUserData({
          name: "",
          sell_price: "",
          buy_price: "",
          added_quantity: "",
        });
        dashboard(`/dashboard/${userid}/stocks`);
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
          <h2>New Stock</h2>
          <LoginForm
            onReset={handleReset}
            onSubmit={handleAddStock}
            className="add-stock"
          >
            <InputFieldWrapper>
              <select
                required
                name="name"
                id="name"
                value={userData.name}
                onChange={handleUserInputChange}
              >
                <option value={""}>--choose a product--</option>
                {products.map((product, idx) => (
                  <option key={idx} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </InputFieldWrapper>
            <InputFieldWrapper>
              <input
                type="number"
                name="sell_price"
                id="sell_price"
                value={userData.sell_price}
                onChange={handleUserInputChange}
                placeholder="New Selling Price"
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <input
                type="number"
                name="buy_price"
                id="buy_price"
                value={userData.buy_price}
                onChange={handleUserInputChange}
                placeholder="New Buy Price"
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <input
                type="number"
                required
                name="added_quantity"
                id="added_quantity"
                value={userData.added_quantity}
                onChange={handleUserInputChange}
                placeholder="Quantity Added"
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
                style={{
                  backgroundColor: "#f72d2d93",
                  color: "#fff",
                  fontWeight: "900",
                }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#28e73193",
                  color: "#fff",
                  fontWeight: "900",
                }}
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

export default AddStock;
