import {
  FaShippingFast,
  FaHeadset,
  FaMoneyBillWave,
  FaLock,
  FaTags,
} from "react-icons/fa";

export default function InfoSection() {
  const infoData = [
    {
      icon: <FaMoneyBillWave size={32} style={{ color: 'var(--shopora-blue)' }} />,
      title: "100% Money Back",
      description: "Full refund if you are not satisfied",
    },
    {
      icon: <FaLock size={32} style={{ color: 'var(--shopora-blue)' }} />,
      title: "Payment Secure",
      description: "Your payment information is safe with us",
    },
    {
      icon: <FaTags size={32} style={{ color: 'var(--shopora-blue)' }} />,
      title: "Discount",
      description: "Enjoy the best prices on our products",
    },
    {
      icon: <FaHeadset size={32} style={{ color: 'var(--shopora-blue)' }} />,
      title: "Support 24/7",
      description: "We are here to assist you anytime",
    },
    {
      icon: <FaShippingFast size={32} style={{ color: 'var(--shopora-blue)' }} />,
      title: "Free Shipping",
      description: "Get your orders delivered with no extra cost",
    },
  ];

  return (
    <section className="px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {infoData.map((item, i) => (
          <div
            key={i}
            style={{ backgroundColor: 'var(--pure-white)' }}
            className="shadow-lg rounded-lg py-6 px-4 text-center hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-primary-text">{item.title}</h3>
            <p className="text-secondary-text text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
