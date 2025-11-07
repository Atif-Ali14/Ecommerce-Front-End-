import { createSlice } from "@reduxjs/toolkit";

// ✅ Load from localStorage (if available)
const savedCart = JSON.parse(localStorage.getItem("cartData"));

const initialState = savedCart || {
  items: [], // {id, name, price, image, qty}
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;

      // ✅ Save to localStorage
      localStorage.setItem("cartData", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;

      state.totalQuantity -= item.qty;
      state.totalAmount -= item.price * item.qty;
      state.items = state.items.filter((i) => i.id !== id);

      localStorage.setItem("cartData", JSON.stringify(state));
    },

    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      item.qty += 1;
      state.totalQuantity += 1;
      state.totalAmount += item.price;

      localStorage.setItem("cartData", JSON.stringify(state));
    },

    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item || item.qty === 1) return;
      item.qty -= 1;
      state.totalQuantity -= 1;
      state.totalAmount -= item.price;

      localStorage.setItem("cartData", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      localStorage.removeItem("cartData");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
