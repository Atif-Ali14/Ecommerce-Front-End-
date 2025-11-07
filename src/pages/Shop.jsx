// src/pages/Shop.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Categories, mockData } from "../assets/MockData";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal"; // Import the modal

export default function Shop() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check if category was passed from footer navigation
  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  const filteredProducts =
    selectedCategory === "All"
      ? mockData
      : mockData.filter((p) => p.category === selectedCategory);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="px-6 py-10 flex gap-6">
      {/* ✅ Filter Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow-lg rounded-md h-max">
        <h2 className="text-lg font-bold mb-4">Filter by Category</h2>

        <ul className="space-y-3 text-gray-700">
          <li
            className={`cursor-pointer pb-2 border-b ${
              selectedCategory === "All" ? "text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All Products
          </li>
          {Categories.map((cat, index) => (
            <li
              key={index}
              className={`cursor-pointer pb-2 border-b hover:text-blue-600 ${
                selectedCategory === cat ? "text-blue-600 font-semibold" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* ✅ Products Area */}
      <div className="w-3/4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {selectedCategory === "All"
            ? "All Products"
            : selectedCategory + " Products"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onImageClick={() => handleImageClick(product)} // Add this prop
            />
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No products available in this category.
          </p>
        )}
      </div>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
