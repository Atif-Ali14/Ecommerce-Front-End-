import { createSlice } from "@reduxjs/toolkit";
import { mockData } from "../assets/MockData";

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: mockData,
    selectedCategory: null,
    searchResults: [],
    searchQuery: "",
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.list = mockData.filter((item) => item.category === action.payload);
    },
    resetFilter: (state) => {
      state.selectedCategory = null;
      state.list = mockData;
      state.searchResults = [];
      state.searchQuery = "";
    },
    searchProducts: (state, action) => {
      const query = action.payload.toLowerCase();
      state.searchQuery = query;
      state.searchResults = mockData.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    },
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    },
  },
});

export const { filterByCategory, resetFilter, searchProducts, clearSearch } =
  productSlice.actions;
export default productSlice.reducer;
