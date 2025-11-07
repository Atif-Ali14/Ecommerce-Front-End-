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
        className="bg-white p-6 rounded-lg w-96 shadow-xl animate-fadeIn scale-100 relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-lg font-bold hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Change Address</h2>
        <textarea
          className="w-full p-2 border rounded-md mb-4"
          rows="4"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(newAddress)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
