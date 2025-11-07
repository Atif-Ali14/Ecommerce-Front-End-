// src/pages/Contact.jsx

export default function Contact() {
  return (
    <section className="px-6 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Contact Us
      </h2>

      {/* Contact Form + Info */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
          <p>If you have any questions or need help, feel free to reach out.</p>

          <p>
             <span className="font-medium">Address:</span> Shopora Center,
            Islamabad, Pakistan
          </p>
          <p>
             <span className="font-medium">Phone:</span> +92 300 1234567
          </p>
          <p>
             <span className="font-medium">Email:</span> support@Shopora.com
          </p>
        </div>

        {/* Contact Form */}
        <form className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
