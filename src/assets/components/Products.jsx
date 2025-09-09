import { Link } from "react-router";

function Products() {
  return (
    <>
      <div>
        {/* section add new product*/}
        {/* list all available products */}
        <Link to={'/dashboard/add-product'}>Click to add</Link>

      </div>
    </>
  );
}

export default Products;
