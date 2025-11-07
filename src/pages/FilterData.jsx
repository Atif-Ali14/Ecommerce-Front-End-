import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSearch } from "../redux/productSlice"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice"; // Adjust path as needed
import toast from "react-hot-toast";

// ProductCard Component with your UI
const ProductCard = ({ product, onImageClick }) => {
  const dispatch = useDispatch();

  if (!product) {
    console.warn("⚠️ ProductCard received undefined product");
    return null;
  }

  const handleAddToCart = () => {
    try {
      dispatch(addToCart(product));
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add product to cart!");
    }
  };

  const { image, name, price, rating } = product;

  const totalStars = 5;
  const fullStars = Math.floor(rating || 0);
  const halfStar = (rating || 0) % 1 >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col items-center">
      <img
        src={image}
        alt={name}
        onClick={onImageClick}
        className="h-40 object-contain mb-4 cursor-pointer"
      />
      <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>

      {/* ⭐ Rating */}
      <div className="flex text-yellow-500 mb-2 text-lg">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={i}>★</span>
          ))}
        {halfStar && <span>⯨</span>}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <span key={i}>☆</span>
          ))}
      </div>

      <p className="text-red-500 font-bold text-lg">${price}</p>

      <button
        className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

// ProductModal Component
const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  if (!product) return null;

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.some((item) => item.id === product.id);

    if (alreadyInCart) {
      toast.error("This product is already in your cart!");
    } else {
      dispatch(addToCart(product));
      toast.success("Product added to cart successfully!");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full mx-4 relative shadow-xl animate-fadeIn scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-lg font-bold hover:text-black"
        >
          ✕
        </button>

        {/* 🖼️ Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-48 object-contain mx-auto mb-4"
        />

        {/* 📝 Product Info */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          {product.name}
        </h2>
        <p className="text-gray-700 mb-2">
          Category: {product.category || "N/A"}
        </p>
        <p className="text-red-500 font-bold text-xl">${product.price}</p>
        <p className="text-gray-600 text-sm mt-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* 🛒 Add to Cart */}
        <button
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-all"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Main FilterData Component
export default function FilterData() {
  const { searchResults, searchQuery } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBack = () => {
    dispatch(clearSearch());
    navigate(-1);
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          {searchQuery && (
            <p className="text-gray-600 mt-2">
              Showing results for:{" "}
              <span className="font-semibold">"{searchQuery}"</span>
            </p>
          )}
        </div>
        <button
          onClick={handleBack}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Results Count */}
      {searchResults.length > 0 && (
        <p className="text-gray-600 mb-6">
          Found {searchResults.length} product
          {searchResults.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Products Grid */}
      {searchResults.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600 font-medium">
            No products found for "{searchQuery}"
          </p>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Try searching with different keywords or browse our categories
          </p>
          <button
            onClick={handleBack}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onImageClick={() => handleImageClick(product)}
            />
          ))}
        </div>
      )}

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
