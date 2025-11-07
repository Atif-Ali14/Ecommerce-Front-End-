import { useState } from "react";

export default function ChangeAddress({ currentAddress, onSave, onClose }) {
  const [newAddress, setNewAddress] = useState(currentAddress);

  if (!currentAddress) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose} // close modal when clicking outside
    >
      <div
        className="bg-pure-white p-6 rounded-lg w-96 shadow-xl animate-fadeIn scale-100 relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-gray text-lg font-bold hover:text-primary-text"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-primary-text">Change Address</h2>
        <textarea
          className="w-full p-2 border rounded-md mb-4"
          rows="4"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-cloud-gray hover:bg-slate-gray"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(newAddress)}
            className="px-4 py-2 rounded-md bg-shopora-blue text-pure-white hover:bg-opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
