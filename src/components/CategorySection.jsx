import { Link } from "react-router-dom";
import MenImg from "../assets/images/men.png";
import WomenImg from "../assets/images/women.png";
import KidsImg from "../assets/images/kids.png";

export default function CategorySection() {
  const categories = [
    {
      title: "Men",
      slug: "men",
      img: MenImg,
      bg: "bg-shopora-blue",
    },
    {
      title: "Women",
      slug: "women",
      img: WomenImg,
      bg: "bg-sunrise-orange",
    },
    {
      title: "Kids",
      slug: "kids",
      img: KidsImg,
      bg: "bg-emerald-green",
    },
  ];

  return (
    <section className="px-6 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <Link
            to={`/products?category=${item.slug}`}
            key={index}
            className="no-underline"
          >
            <div
              style={{ backgroundColor: `var(--${item.bg.replace('bg-','').replace('-','-')})` }}
              className={`rounded-xl h-[280px] flex 
              justify-between items-center px-6 cursor-pointer 
              shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
            >
              {/* Text */}
              <div>
                <h3 className="text-2xl font-semibold text-primary-text">
                  {item.title}
                </h3>
                <p className="text-sm text-secondary-text font-medium">View All</p>
              </div>

              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-1/2 object-cover drop-shadow-md"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
