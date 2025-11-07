/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

export default function ProductModal({ product, onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  if (!product) return null;

  // Check if product is already in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
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
        style={{ backgroundColor: 'var(--pure-white)' }}
        className="p-6 rounded-lg max-w-md w-full mx-4 relative shadow-xl animate-fadeIn scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-gray text-lg font-bold hover:text-primary-text"
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
        <h2 className="text-2xl font-semibold mb-2 text-primary-text">
          {product.name}
        </h2>
        <p className="text-secondary-text mb-2">
          Category: {product.category || "N/A"}
        </p>
        <p style={{ color: 'var(--shopora-blue)' }} className="font-bold text-xl">${product.price}</p>
        <p className="text-secondary-text text-sm mt-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* 🛒 Add to Cart Button */}
        <button
          className={`mt-6 w-full py-2 rounded-lg transition-all ${
            isInCart
              ? "bg-emerald-green text-pure-white cursor-default"
              : "bg-shopora-blue text-pure-white hover:bg-midnight-navy"
          }`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
