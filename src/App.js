import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import Tshirt from "./Components/Tshirt";
import Kids from "./Components/Kids";
import Sports from "./Components/Sports";
import Motorsport from "./Components/Motorsport";
import Product_Details from "./Components/Product_Details";
import Product_Details2 from "./Components/Product_Details2";
import Product_Details3 from "./Components/Product_Details3";
import Product_Details4 from "./Components/Product_Details4";
import Footer from "./Components/Footer";
import Outlet from "./Components/Outlet";
import Outlet_Details from "./Components/Outlet_Details";
import Racing from "./Components/Racing";
import Women from "./Components/Women";
import Cart from "./Components/Cart";
import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import WishList from "./Components/WishList";
import SearchResult from "./Components/SearchResult";

function App() {
  const [text, setText] = useState("Guest User");

  // ✅ Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Dark Mode Toggle Function
  const toggleDarkMode = () => {
    if (!darkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
    setDarkMode(!darkMode);
  };

  // ✅ Get Current Page URL
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/LoginForm";

  return (
    <>
      {/* ✅ Navbar ko conditionally render kiya */}
      {!hideNavbar && <Navbar text={text} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}

      <Routes>
        <Route path="/" element={<LoginForm setText={setText} />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/HomePage/:category" element={<Tshirt />} />
        <Route path="/HomePage2/:category" element={<Kids />} />
        <Route path="/HomePage3/:category" element={<Motorsport />} />
        <Route path="/HomePage4/:category" element={<Sports />} />
        <Route path="/HomePage7/:category" element={<Racing />} />
        <Route path="/Outlet/:category" element={<Outlet />} />
        <Route path="/Women/:category" element={<Women />} />
        <Route path="/product/:id" element={<Product_Details />} />
        <Route path="/HomePage/:category/:id" element={<Product_Details />} />
        <Route path="/HomePage2/:category/:id" element={<Product_Details2 />} />
        <Route path="/HomePage3/:category/:id" element={<Product_Details3 />} />
        <Route path="/HomePage4/:category/:id" element={<Product_Details4 />} />
        <Route path="/Outlet/:category/:id" element={<Outlet_Details />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/wishList" element={<WishList />} />
        <Route path="/LoginForm" element={<LoginForm setText={setText} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
