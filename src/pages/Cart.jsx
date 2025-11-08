import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import ChangeAddress from "../components/ChangeAddress";
import { toast } from "react-hot-toast"; // ✅ Import toast

export default function Cart() {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const [address, setAddress] = useState(
    localStorage.getItem("shippingAddress") || "Lahore Pakistan"
  );
  const [showModal, setShowModal] = useState(false);

  // ✅ Update address + show toast
  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem("shippingAddress", newAddress);
    setShowModal(false);

    // ✅ Show success toast
    toast.success("Shipping address updated!");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem("shippingAddress");
    setAddress("Lahore Pakistan");
  };

  if (items.length === 0) {
    return (
      <div className="px-6 py-16 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Your Cart is Empty 🛒
        </h2>
        <Link
          to="/"
          style={{ backgroundColor: 'var(--sunrise-orange)', color: 'var(--pure-white)' }}
          className="px-6 py-3 rounded-md hover:opacity-90 transition-all"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="relative px-4 md:px-10 py-10 max-w-5xl mx-auto">
      {/* Cart Content */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Your Shopping Cart
        </h2>

        {/* Cart Items */}
        <div className="space-y-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap sm:flex-nowrap items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-4 w-full sm:w-1/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-md bg-gray-50 p-2"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-red-500 font-semibold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-md px-2 py-1 sm:py-0">
                <button
                  onClick={() => dispatch(decrementQty(item.id))}
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 text-lg font-semibold"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-gray-800">
                  {item.qty}
                </span>
                <button
                  onClick={() => dispatch(incrementQty(item.id))}
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 text-lg font-semibold"
                >
                  +
                </button>
              </div>

              <div className="flex items-center justify-center sm:w-auto w-full mt-3 sm:mt-0">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 hover:text-red-800 text-xl font-bold"
                  title="Remove Item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-10 bg-white shadow-md rounded-lg p-6 text-right border-t">
          <p className="text-lg font-semibold text-gray-700 mb-1">
            Total Items:{" "}
            <span className="text-gray-900 font-bold">{totalQuantity}</span>
          </p>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              style={{ backgroundColor: 'var(--sunrise-orange)', color: 'var(--pure-white)' }}
              className="px-6 py-2 rounded-md hover:opacity-90 transition-all"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>

        {/* Shipping Addresses */}
        <div className="mt-10 bg-gray-50 shadow-md rounded-lg p-6 border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Shipping Address
          </h3>
          <p className="text-gray-700">{address}</p>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
            Ship To Address
          </h3>
          <p className="text-gray-700">{address}</p>

          <button
            onClick={() => setShowModal(true)}
            style={{ backgroundColor: 'var(--sunrise-orange)', color: 'var(--pure-white)' }}
            className="mt-4 px-4 py-2 rounded-md hover:opacity-90 transition-all"
          >
            Change Address
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ChangeAddress
          currentAddress={address}
          onSave={handleAddressChange}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
