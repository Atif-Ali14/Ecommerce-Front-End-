import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { searchProducts } from "../redux/productSlice"; // Adjust path as needed
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      dispatch(searchProducts(searchInput));
      navigate("/filterData");
      setMenuOpen(false); // Close mobile menu after search
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <header className="shadow-sm">
      {/* Top Navbar */}
      <nav className="bg-white text-black px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-700">
          Shopora
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/3 bg-gray-100 rounded-md overflow-hidden border border-gray-300">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 text-black outline-none bg-gray-100"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="px-4 py-2 text-gray-600 hover:text-black"
            onClick={handleSearch}
          >
            <FaSearch size={18} />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 hover:text-gray-700"
          >
            <FaShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {totalQuantity}
              </span>
            )}
            <span>Cart</span>
          </Link>

          <div className="flex gap-2">
            <button onClick={openLogin} className="hover:text-gray-700">
              Login
            </button>
            <span>|</span>
            <button onClick={openRegister} className="hover:text-gray-700">
              Register
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="bg-white flex flex-col px-6 py-4 gap-4 border-t md:hidden">
          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 rounded-md overflow-hidden border border-gray-300"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 bg-gray-100 outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-gray-600 hover:text-black"
            >
              <FaSearch />
            </button>
          </form>

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart size={18} />
            Cart
          </Link>

          <button
            onClick={() => {
              openLogin();
              setMenuOpen(false);
            }}
            className="hover:text-gray-700 text-left"
          >
            Login
          </button>
          <button
            onClick={() => {
              openRegister();
              setMenuOpen(false);
            }}
            className="hover:text-gray-700 text-left"
          >
            Register
          </button>
        </div>
      )}

      {/* Bottom Navigation Menu */}
      <div className="bg-white py-3 hidden md:block">
        <ul className="flex items-center justify-center gap-8 font-medium text-gray-800">
          <li>
            <Link to="/" className="hover:text-black hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-black hover:underline">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-black hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-black hover:underline">
              About
            </Link>
          </li>
        </ul>
      </div>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSignUpClick={openRegister}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onLoginClick={openLogin}
        />
      )}
    </header>
  );
}
