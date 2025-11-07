// src/pages/Home.jsx
import { useState, useEffect } from "react";
import Img1 from "../assets/images/1.jpg";
import Img2 from "../assets/images/2.jpg";
import Img3 from "../assets/images/3.jpg";
import Img4 from "../assets/images/4.jpg";
import { Categories, mockData } from "../assets/MockData";
import InfoSection from "../components/InfoSection";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard"; // ✅ Import
import ProductModal from "../components/ProductModal";

export default function Home() {
  const images = [Img1, Img2, Img3, Img4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageClick = (product) => {
    setSelectedProduct(product); // open modal
  };

  const closeModal = () => {
    setSelectedProduct(null); // close modal
  };

  return (
    <>
      {/* ✅ Top Section */}
      <div className="flex flex-col md:flex-row px-4 md:px-6 py-6 gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="space-y-3 text-gray-700">
            {Categories.map((cat, index) => (
              <li
                key={index}
                className="hover:text-blue-600 cursor-pointer border-b pb-2"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Banner */}
        <div className="w-full md:w-3/4 relative">
          <img
            src={images[currentIndex]}
            alt="Banner"
            className="w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover rounded-md shadow-md transition-all duration-700"
          />
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
                  currentIndex === i ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <InfoSection />

      {/* Categories */}
      <CategorySection />

      {/* Top Products */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Top Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mockData.slice(0, 10).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onImageClick={() => handleImageClick(product)}
            />
          ))}
        </div>
      </section>

      {/* Shop Now */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Shop Now
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {mockData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onImageClick={() => handleImageClick(product)}
            />
          ))}
        </div>
      </section>

      {/* ✅ Modal Render */}
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </>
  );
}
