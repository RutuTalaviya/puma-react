import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OfferBanner from "./OfferBanner";

export default function Tshirt() {
  const [state, setState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("none");
  const itemsPerPage = 8; // Per page kitne items chahiye

  useEffect(() => {
    fetch("https://puma-react.onrender.com/Tshirt")
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  }, []);

  // Sorting Logic
  const sortedItems = [...state];
  if (sortOrder === "low-to-high") {
    sortedItems.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-to-low") {
    sortedItems.sort((a, b) => b.price - a.price);
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <OfferBanner />
      
      {/* Sorting Dropdown */}
      <div className="mb-3 d-flex justify-content-end">
        <select className="form-select w-auto" onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">Sort by Price</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="row g-4">
        {currentItems.map((el) => (
          <div className="col-md-3" key={el.id}>
            <Link to={`/HomePage/${el.category}/${el.id}`} className="text-decoration-none">
              <div className="card shadow-lg p-2 bg-white rounded">
                <img src={el.img} alt={el.title} className="card-img-top img-fluid" />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <h6 className="card-title text-dark mb-0">{el.title}</h6>
                    <h5 className="mb-0">₹{el.price}</h5>
                  </div>
                  <h6 className="bg-secondary text-white p-1 rounded text-center w-50 mt-3">
                    {el.category}
                  </h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
          </li>

          {[...Array(totalPages).keys()].map((num) => (
            <li className={`page-item ${currentPage === num + 1 ? "active" : ""}`} key={num}>
              <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
                {num + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
