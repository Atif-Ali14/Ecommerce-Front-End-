// src/pages/About.jsx

export default function About() {
  return (
    <section className="px-6 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        About Us
      </h2>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 text-gray-700 space-y-4">
        <p>
          Welcome to <b>Shopora</b>, your one-stop online store for everything — from electronics and fashion to home essentials and more. 
          We bring together quality products, affordable prices, and a smooth shopping experience to make online shopping simple and enjoyable.
        </p>

        <p>
          At Shopora, we focus on trust, convenience, and customer satisfaction. Every item is carefully selected from reliable sellers, ensuring you get the best value with every purchase. 
          Whether you’re upgrading your tech, refreshing your wardrobe, or finding something for your home, Shopora has it all.
        </p>

        <p>
          Shop with confidence, explore new collections, and enjoy a seamless experience — only at Shopora, where quality meets convenience.
        </p>

        <p className="font-semibold text-gray-900">
          Thank you for choosing Shopora ❤️
        </p>
      </div>
    </section>
  );
}
