import { Link } from "react-router";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { getStocksFromDB } from "../store/StocksSlice";
import { Button } from "milesuicomponents";

function Stocks() {
  const { userid } = useParams();
  const { stocks } = useSelector((state) => state.Stocks);
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "buy_price", headerName: "Entry Price", width: 100 },
    {
      field: "added_quantity",
      headerName: "Added Quantity",
      type: "number",
      width: 150,
    },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const rows = stocks.map((item, index) => ({
    id: index + 1,
    name: item.name,
    price: `$ ${item.sell_price}`,
    buy_price: `$ ${item.buy_price}`,
    added_quantity: item.added_quantity,
    status: item.status,
  }));

  useEffect(() => {
    dispatch(getStocksFromDB(userid));
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
        {/* section add new stock*/}
        <Link
          to={`/dashboard/${userid}/add-stock`}
          style={{ marginLeft: "auto" }}
        >
          <Button>New Stock</Button>
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

export default Stocks;
