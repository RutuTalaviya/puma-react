import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SearchResult() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    const categories = ["Tshirt", "Kids", "Motorsport", "Sports", "Outlet", "Women", "Racing","Collaborations"];
    
    Promise.all(categories.map(category =>
      fetch(`https://puma-react.onrender.com/${category}`)
        .then(res => res.json())
        .catch(err => {
          console.error(`Error fetching ${category}:`, err);
          return []; 
        })
    )).then(dataArrays => {
      const allProducts = dataArrays.flat();
      console.log("All fetched products:", allProducts);

      const filteredProducts = allProducts.filter(item => 
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Filtered products:", filteredProducts);

      setProducts(filteredProducts);
    });

  }, [query]);

  const addToCart = (product) => {
    const size = selectedSizes[product.id]; 
    if (!size) {
      alert("Please select a size before adding to cart!");
      return;
    }
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cartItems.find(
      (item) => item.id === product.id && item.size === size
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, size, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert(`Item (${size}) added to cart!`);
  };

  const addToWishlist = (product) => {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlistItems.find((item) => item.id === product.id)) {
      wishlistItems.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      alert("Item added to wishlist!");
    } else {
      alert("Item is already in wishlist!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Search Results for "{query}"</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card shadow-lg">
                <img src={product.img} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">₹{product.price}</p>

                  <div className="mb-2">
                    <strong>Size:</strong>
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className={`btn btn-sm ms-2 ${
                          selectedSizes[product.id] === size ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: size })}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <button className="btn btn-primary mt-2 w-100" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>

                  <button className="btn btn-outline-danger mt-2 w-100" onClick={() => addToWishlist(product)}>
                    ❤️ Add to Wishlist
                  </button>

                    
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found!</p>
        )}
      </div>
    </div>
  );
}

const getCategoryPath = (category) => {
  const categoryPaths = {
    "Tshirt": "HomePage",
    "Kids": "HomePage2",
    "Motorsport": "HomePage3",
    "Sports": "HomePage4",
    "Outlet": "Outlet",
    "Women": "Women",
    "Racing": "HomePage7"
  };
  return categoryPaths[category] || "HomePage";
};
