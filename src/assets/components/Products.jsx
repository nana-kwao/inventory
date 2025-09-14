import { Link } from "react-router";
import { useParams } from "react-router";

function Products() {
  const { userid } = useParams();

  return (
    <>
      <div>
        {/* section add new product*/}
        {/* list all available products */}
        <Link to={`/dashboard/${userid}/add-product`}>Click to add</Link>
      </div>
    </>
  );
}

export default Products;
