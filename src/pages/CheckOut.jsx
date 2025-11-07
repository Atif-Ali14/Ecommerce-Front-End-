// CheckOut.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);

  // Get saved address from localStorage
  const savedAddress = localStorage.getItem("shippingAddress") || "";

  const [billing, setBilling] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: savedAddress, // pre-fill from Cart
    city: "",
    postalCode: "",
    country: "",
  });

  // If cart is empty, redirect
  useEffect(() => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/shop");
    }
  }, [items, navigate]);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const { fullName, email, phone, address, city, postalCode, country } =
      billing;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode ||
      !country
    ) {
      toast.error("Please fill all billing details!");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    localStorage.setItem("shippingAddress", address);

    const orderNumber = `ORD-${Date.now()}`;

    const orderData = {
      orderNumber,
      items: [...items],
      totalAmount,
      billing: { ...billing },
    };

    // Navigate first
    navigate("/order", { state: orderData });

    // ✅ Only clear cart and localStorage **after navigation**
    setTimeout(() => {
      dispatch(clearCart());
      localStorage.removeItem("shippingAddress");
    }, 100);

    toast.success("Order placed successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Billing Form */}
        <div className="lg:w-2/3 bg-gray-50 p-6 rounded-md shadow">
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
          <form className="space-y-4">
            {[
              { name: "fullName", placeholder: "Enter your full name" },
              { name: "email", placeholder: "Enter your email", type: "email" },
              { name: "phone", placeholder: "Enter your phone number" },
              { name: "address", placeholder: "Enter your address" },
              { name: "city", placeholder: "Enter your city" },
              { name: "postalCode", placeholder: "Enter postal code" },
              { name: "country", placeholder: "Enter your country" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 mb-1">
                  {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={billing[field.name]}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-white p-6 rounded-md shadow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-2 border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>
                    {item.name} x {item.qty}
                  </span>
                </div>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-bold text-lg">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
