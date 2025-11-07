import React, { useState } from "react";

export default function LoginModal({ onClose, onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with ${email} | Remember me: ${rememberMe}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose} // close when clicking outside
    >
      <div
        className="bg-pure-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-slate-gray text-lg font-bold hover:text-primary-text"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-center text-primary-text">Login</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />

          {/* Remember me + Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-secondary-text">Remember me</span>
            </label>
            <button
              type="button"
              className="text-shopora-blue hover:underline"
              onClick={() => alert("Redirect to forgot password")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full bg-shopora-blue text-pure-white py-2 rounded-md font-bold hover:bg-opacity-90">
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4 text-secondary-text">
          Don't have an account?{" "}
          <button
            className="text-shopora-blue hover:underline"
            onClick={() => {
              onClose();
              onSignUpClick(); // open register modal
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
