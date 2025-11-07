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
      {/* Top Navbar - Logo, Page Links, Search Bar */}
      <nav style={{ backgroundColor: 'var(--midnight-navy)', color: 'var(--pure-white)' }} className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-opacity-90">
            Shopora
          </Link>

          {/* Page Links - Desktop - Centered */}
          <div className="hidden md:flex items-center gap-8 font-medium absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="hover:text-shopora-blue hover:underline">
              Home
            </Link>
            <Link to="/shop" className="hover:text-shopora-blue hover:underline">
              Shop
            </Link>
            <Link to="/contact" className="hover:text-shopora-blue hover:underline">
              Contact
            </Link>
            <Link to="/about" className="hover:text-shopora-blue hover:underline">
              About
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center w-1/3 bg-cloud-gray rounded-full overflow-hidden border border-slate-gray">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 text-primary-text outline-none bg-cloud-gray rounded-l-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="px-4 py-2 text-slate-gray hover:text-primary-text rounded-r-full"
              onClick={handleSearch}
            >
              <FaSearch size={18} />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-pure-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Second Row - Cart, Login, Register (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-8 mt-4 pt-4 border-t border-slate-gray">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 hover:text-opacity-90"
          >
            <FaShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-sunrise-orange text-pure-white text-xs rounded-full px-2 py-0.5">
                {totalQuantity}
              </span>
            )}
            <span>Cart</span>
          </Link>

          <div className="flex gap-2">
            <button onClick={openLogin} className="hover:text-opacity-90">
              Login
            </button>
            <span>|</span>
            <button onClick={openRegister} className="hover:text-opacity-90">
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div style={{ backgroundColor: 'var(--midnight-navy)', color: 'var(--pure-white)' }} className="flex flex-col px-6 py-4 gap-4 border-t md:hidden">
          {/* Page Links */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="hover:text-shopora-blue" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="hover:text-shopora-blue" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/contact" className="hover:text-shopora-blue" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/about" className="hover:text-shopora-blue" onClick={() => setMenuOpen(false)}>About</Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-cloud-gray rounded-full overflow-hidden border border-slate-gray"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-cloud-gray outline-none text-primary-text rounded-l-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 text-slate-gray hover:text-primary-text rounded-r-full"
            >
              <FaSearch />
            </button>
          </form>

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-opacity-90"
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
            className="hover:text-opacity-90 text-left"
          >
            Login
          </button>
          <button
            onClick={() => {
              openRegister();
              setMenuOpen(false);
            }}
            className="hover:text-opacity-90 text-left"
          >
            Register
          </button>
        </div>
      )}

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
