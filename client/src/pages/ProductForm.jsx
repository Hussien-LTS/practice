import { useState, useContext, useEffect } from "react";
import { createProduct, updateProduct } from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProductForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const existingProduct = location.state?.product || {};

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/products"); // Redirect non-admins
    }
  }, [user, navigate]);

  const [product, setProduct] = useState({
    name: existingProduct.name || "",
    price: existingProduct.price || "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingProduct.id) {
      await updateProduct(existingProduct.id, product);
    } else {
      await createProduct(product);
    }
    navigate("/products");
  };

  return (
    <div>
      <h2>{existingProduct.id ? "Edit Product" : "Create Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {existingProduct.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
