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
          Welcome to <span className="font-semibold">E-Shop</span> — your
          one-stop destination for quality products at the best prices. We
          believe in offering a seamless shopping experience with fast delivery
          and secure payment options.
        </p>

        <p>
          Our mission is to bring you a wide range of products including
          electronics, fashion, home essentials, beauty items, and more — all in
          one store.
        </p>

        <p>
          We value our customers and continuously work to provide the best
          service possible. Your satisfaction is our top priority!
        </p>

        <p className="font-semibold text-gray-900">
          Thank you for choosing E-Shop ❤️
        </p>
      </div>
    </section>
  );
}
