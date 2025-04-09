import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">My Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <div className="text-center mt-5">
          <h5 className="text-secondary">Your wishlist is empty!</h5>
          <Link to="/HomePage" className="btn btn-lg btn-primary mt-3 shadow-sm">Continue Shopping</Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {wishlist.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100 shadow-lg border-0 rounded-4 p-3 wishlist-card">
                <img 
                  src={item.img} 
                  className="rounded wishlist-img" 
                  alt={item.title} 
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-dark fw-bold">{item.title}</h5>
                  <p className="card-text fw-bold text-danger fs-5">₹{item.price}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button 
                      className="btn btn-outline-danger px-4" 
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      ❌ Remove
                    </button>
                    <button 
                      className="btn btn-primary px-4" 
                      onClick={() => addToCart(item)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`
        .wishlist-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }
        .wishlist-img:hover {
          transform: scale(1.05);
        }
        .wishlist-card {
          transition: all 0.3s ease-in-out;
        }
        .wishlist-card:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}