import React, { useState } from "react";

export default function RegisterModal({ onClose, onLoginClick }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Registering ${fullName} with ${email}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose} // close when clicking outside
    >
      <div
        style={{ backgroundColor: 'var(--pure-white)' }}
        className="rounded-lg shadow-xl p-6 w-full max-w-md relative"
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
        <h2 className="text-2xl font-bold mb-4 text-center text-primary-text">Register</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ backgroundColor: 'var(--cloud-gray)', color: 'var(--primary-text)' }}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: 'var(--cloud-gray)', color: 'var(--primary-text)' }}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ backgroundColor: 'var(--cloud-gray)', color: 'var(--primary-text)' }}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ backgroundColor: 'var(--cloud-gray)', color: 'var(--primary-text)' }}
            className="w-full border rounded-md p-2"
            required
          />

          {/* Register button */}
          <button style={{ backgroundColor: 'var(--shopora-blue)', color: 'var(--pure-white)' }} className="w-full py-2 rounded-md hover:opacity-90">
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-4 text-secondary-text">
          Already have an account?{" "}
          <button
            style={{ color: 'var(--shopora-blue)' }}
            className="hover:underline"
            onClick={() => {
              onClose();
              onLoginClick(); // open login modal
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
