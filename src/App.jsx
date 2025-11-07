import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import CheckOut from "./pages/CheckOut";
import Order from "./pages/Order";
import FilterData from "./pages/FilterData";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar />

        {/* ✅ Add the Toaster for notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#4ade80",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#f87171",
                color: "#fff",
              },
            },
          }}
        />

        {/* Content should take remaining space */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order" element={<Order />} />
            <Route path="/filterData" element={<FilterData />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
