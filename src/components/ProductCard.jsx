import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
export default function ProductCard({ product, onImageClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  if (!product) {
    console.warn("⚠️ ProductCard received undefined product");
    return null;
  }

  // Check if product is already in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    try {
      if (isInCart) {
        toast.error("This product is already in your cart!");
      } else {
        dispatch(addToCart(product));
        toast.success("Product added to cart successfully!");
      }
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
        className={`mt-3 px-4 py-2 rounded-md transition-all ${
          isInCart
            ? "bg-green-600 text-white cursor-default"
            : "bg-gray-800 text-white hover:bg-blue-700"
        }`}
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
