import { useEffect, useState, useContext } from "react";
import { getProducts, deleteProduct } from "../api/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div>
      <h2>Products List</h2>
      {user?.role === "admin" && (
        <Link to="/products/new">
          <button>Add Product</button>
        </Link>
      )}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            {user?.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              {user?.role === "admin" && (
                <td>
                  <Link to={`/products/edit/${product.id}`} state={{ product }}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
