import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getProductsFromDB } from "../store/ProductSlice";
import { Button } from "milesuicomponents";

function Products() {
  const { userid } = useParams();
  const { products } = useSelector((state) => state.Products);
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "buy_price", headerName: "Entry Price", width: 100 },
    {
      field: "available_quantity",
      headerName: "Available",
      type: "number",
      width: 100,
    },
    {
      field: "sold_quantity",
      headerName: "Sold",
      type: "number",
      width: 80,
    },
    {
      field: "total_quantity",
      headerName: "Total Quantity",
      type: "number",
      width: 150,
    },
    { field: "sales", headerName: "Sold Amount", width: 100 },
    { field: "revenue", headerName: "Total Revenue", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const rows = products.map((item, index) => ({
    id: index + 1,
    name: item.name,
    price: `$ ${item.sell_price}`,
    buy_price: `$ ${item.buy_price}`,
    available_quantity: item.available_quantity,
    total_quantity: item.total_quantity,
    sold_quantity: item.sold_quantity,
    sales: `$ ${item.sold_amount}`,
    revenue: `$ ${item.total_revenue}`,
    status: item.status,
  }));

  useEffect(() => {
    dispatch(getProductsFromDB(userid));
  }, [dispatch, userid]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "1rem",
          overflowX: "auto",
        }}
      >
        {/* section add new product*/}
        <Link
          to={`/dashboard/${userid}/add-product`}
          style={{ marginLeft: "auto" }}
        >
          <Button>New Product</Button>
        </Link>
        {/* list all available products */}
        <DataGrid
          className="product-table"
          style={{ overflowX: "auto" }}
          columns={columns}
          rows={rows}
          pageSizeOptions={[5, 10, 25]}
          pagination
          checkboxSelection
          isCellEditable={() => false}
          disableRowSelectionOnClick={() => true}
        />
      </div>
    </>
  );
}

export default Products;
