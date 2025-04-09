import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import video from "./Assests/p.webm";
import { CiHeart } from "react-icons/ci";

export default function Outlet_Details() {
  const [state, setState] = useState({});
  const { category, id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(""); // Track main image

  useEffect(() => {
    fetch(`https://puma-react.onrender.com/${category}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setState(data);
        setSelectedImage(data.img); // Set default main image
      });
  }, []);

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cartItems.find(
      (item) => item.id === state.id && item.size === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...state, size: selectedSize, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert(`Item (${selectedSize}) added to cart!`);
  };

  const addToWishlist = () => {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlistItems.find((item) => item.id === state.id)) {
      wishlistItems.push(state);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      alert("Item added to wishlist!");
    } else {
      alert("Item is already in wishlist!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Product Image with Gallery */}
        <div className="col-md-6 text-center">
          {/* Main Image */}
          <img
            src={selectedImage}
            alt={state.title}
            className="img-fluid rounded shadow-lg"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* Thumbnail Images */}
          <div className="d-flex justify-content-center mt-3">
            {state.gallery?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className="img-thumbnail mx-2"
                style={{ width: "80px", height: "80px", cursor: "pointer" }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <div className="p-4 ">
            <h2>{state.title}</h2>
            <h4 className="mt-3">₹{state.price}</h4>

            {/* Dynamic Size Selection */}
            <div className="mt-3">
              <span className="fw-bold">Size: </span>
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`btn ms-2 ${
                    selectedSize === size ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <h3 className="rounded d-inline-block mt-3">Category: {state.category}</h3>
            <h6 className="mt-3">
              <span className="fw-bold">Description:</span> {state.Description}
            </h6>
            <h6 className="mt-3">
              <span className="fw-bold">Shipping & Returns:</span> {state.Shipping}
            </h6>

            {/* Add to Cart Button */}
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={addToCart}
              disabled={!selectedSize}
            >
              Add to Cart
            </button>
            <button className="btn btn-outline-danger mt-3 w-100" onClick={addToWishlist}>
              <CiHeart fontSize={25} /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <div className="row">
          <div className="mt-4">
            <h4 className="fw-bold">Related Products</h4>
            <div className="row">
              {state.related_prod?.map((prod, index) => (
                <div className="col-md-3 text-center" key={index}>
                  <img
                    src={prod}
                    alt={`Related Product ${index}`}
                    className="img-fluid rounded shadow-lg border border-secondary"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Video */}
      <video
        src={video}
        className="img-fluid mt-5"
        width="100%"
        controls
        muted
        autoPlay
      ></video>

      {/* Product Information */}
      <div className="mt-5 p-4 rounded bg-light shadow-lg">
        <h2 className="fw-bold text-dark">About PUMA x Scuderia Ferrari</h2>
        <p className="fs-5 text-secondary">
          In 2005, Scuderia Ferrari—the preeminent, time-honored Formula 1 team—made a momentous decision to forge a partnership with the sports brand boasting the most storied heritage in motorsport—PUMA.
        </p>

        <h2 className="fw-bold text-dark mt-4">Product Story</h2>
        <p className="fs-5 text-secondary">
          Join the Scuderia Ferrari family with our Ferrari Race Tonal Polo. Featuring a jacquard collar, tonal Ferrari Shield, and a sleek design, this polo embodies tradition and innovation for motorsport fans.
        </p>

        <h2 className="fw-bold text-dark mt-4">Features & Benefits</h2>
        <ul className="list-unstyled fs-5 text-secondary">
          <li className="mb-2">
            <i className="bi bi-check-circle text-success"></i> Made with at least 30% recycled cotton
          </li>
        </ul>
      </div>
    </div>
  );
}
