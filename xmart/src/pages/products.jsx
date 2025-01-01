import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    images: [],
    seller: ""
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const response = await axios.post("/api/products", newProduct);
      setProducts([...products, response.data.data]);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        images: [],
        seller: ""
      });
    } catch (error) {
      console.error("Error creating product:", error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(`/api/products/${editingProduct._id}`, editingProduct);
      setProducts(products.map((product) => (product._id === editingProduct._id ? response.data.data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Images (comma separated URLs)"
          value={newProduct.images.join(", ")}
          onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value.split(", ") })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Seller ID"
          value={newProduct.seller}
          onChange={(e) => setNewProduct({ ...newProduct, seller: e.target.value.trim() })}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreateProduct} className="bg-blue-500 text-white p-2">Add Product</button>
      </div>
      <div className="overflow-y-auto max-h-96">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-6">
              {editingProduct && editingProduct._id === product._id ? (
                <>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="text"
                    value={editingProduct.images.join(", ")}
                    onChange={(e) => setEditingProduct({ ...editingProduct, images: e.target.value.split(", ") })}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="text"
                    value={editingProduct.seller}
                    onChange={(e) => setEditingProduct({ ...editingProduct, seller: e.target.value.trim() })}
                    className="border p-2 mb-2"
                  />
                  <button onClick={handleUpdateProduct} className="bg-green-500 text-white p-2 mr-2">Save</button>
                  <button onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white p-2">Cancel</button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-2">{product.description}</p>
                  <p className="text-gray-900 font-bold mb-2">${product.price}</p>
                  <p className="text-gray-700 mb-2">Category: {product.category}</p>
                  <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
                  <p className="text-gray-700 mb-2">Seller: {product.seller}</p>
                  <div className="mb-2">
                    {product.images.length > 0 ? (
                      product.images.map((image, index) => (
                        <img key={index} src={image} alt={product.name} className="w-16 h-16 object-cover mr-2" />
                      ))
                    ) : (
                      <p>No images yet</p>
                    )}
                  </div>
                  <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white p-2 mr-2">Edit</button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white p-2">Delete</button>
                  <Link to={`/products/${product._id}`} className="text-blue-500 hover:underline">View Details</Link>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
