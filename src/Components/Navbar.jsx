import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaSun, FaMoon } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

export default function Navbar({ text }) {
  const [search, setSearch] = useState(""); 
  const [products, setProducts] = useState([]); 
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const lightLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMcQ7U9t4SOTo8guRYRR0_re2MoQMgO_ULiw&s";
  const darkLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvHwr0e8_720Om847vN_Q7bGKWLTcw6TSxQ&s";
  const logoSrc = darkMode ? darkLogo : lightLogo;

  // Dark Mode Apply on Body
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#000000";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const categories = ["Shoes", "Tshirt", "Kids", "Motorsport", "Sports", "Outlet", "Women", "Racing"];
    Promise.all(categories.map(category =>
      fetch(`https://puma-react.onrender.com/${category}`).then(res => res.json())
    )).then(dataArrays => {
      setProducts(dataArrays.flat());
    });
  }, []);

  const updateCounts = () => {
    setCartCount(JSON.parse(localStorage.getItem("cart"))?.length || 0);
    setWishlistCount(JSON.parse(localStorage.getItem("wishlist"))?.length || 0);
  };

  useEffect(() => {
    updateCounts(); 

    window.addEventListener("storage", updateCounts); 

    return () => window.removeEventListener("storage", updateCounts); // Cleanup
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
      setShowSuggestions(false);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="container-fluid">
        <Link to="/HomePage">
          <img
            className="navbar-brand"
            src={logoSrc} 
            width="100"
            alt="Logo"
            style={{ cursor: "pointer" }}
          />
        </Link>

        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/HomePage2/New'>New</Link></li>
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/HomePage/Men'>Men</Link></li>
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/Women/Women'>Women</Link></li>
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/HomePage4/Sport'>Sport</Link></li>
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/HomePage3/Motorsport'>Motorsport</Link></li>
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/HomePage4/Collaborations'>Collaborations</Link></li>
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/HomePage2/Kids'>Kids</Link></li>
            <li className="nav-item"><Link className={`nav-link ${darkMode ? "text-light" : "text-dark"}`} to='/Outlet/Outlet'>Outlet</Link></li>
          </ul>

          <div className="d-flex align-items-center ms-auto gap-3 position-relative">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control"
                type="search"
                placeholder="Search product or category"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <Link to="/wishlist" className="position-relative">
              <CiHeart fontSize={30} className={darkMode ? "text-light" : "text-dark"} />
              <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                {wishlistCount}
              </span>
            </Link>
            
            <Link to="/cart" className="position-relative">
              <IoCartOutline size={30} className={darkMode ? "text-light" : "text-dark"} />
              <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            </Link>

            <div className="d-flex flex-column align-items-center gap-1">
              <Link to="/LoginForm">
                <FaRegUser size={20} className={darkMode ? "text-light" : "text-dark"} />
              </Link>
              <p className="m-0 fw-bold">{text}</p>
            </div>

            <button className="btn btn-outline-secondary" onClick={toggleDarkMode}>
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
