// Order.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Order() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) return navigate("/"); // redirect if no order info

  const { orderNumber, items, totalAmount, billing } = state;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Success Banner */}
      <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-1">Thank you for your order!</h2>
        <p>
          Your order has been successfully placed. You will receive an email
          shortly.
        </p>
        <p className="mt-2 font-medium text-gray-700">
          Order Number: <span className="font-bold">{orderNumber}</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Billing Details */}
        {/* Left: Billing Details */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Billing Details
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {billing.fullName}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {billing.address}
            </p>
            <p>
              <span className="font-semibold">City:</span> {billing.city}
            </p>
            <p>
              <span className="font-semibold">Postal Code:</span>{" "}
              {billing.postalCode}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {billing.country}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {billing.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {billing.phone}
            </p>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-4 border-b pb-2">
            Order Summary
          </h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => navigate("/shop")}
              className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-all duration-200"
            >
              Continue Shopping
            </button>
            <button
              onClick={() =>
                alert("Track order functionality not implemented yet.")
              }
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
