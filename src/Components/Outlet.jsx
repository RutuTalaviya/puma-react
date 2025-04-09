import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OfferBanner from './OfferBanner';

export default function Outlet() {
    const [state, setState] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState("default");
    const itemsPerPage = 8; 

    useEffect(() => {
        fetch("https://puma-react.onrender.com/Outlet")
        .then((res) => res.json())
        .then((data) => {
            setState(data);
        });
    }, []);

    // Sorting Logic
    const sortedItems = [...state].sort((a, b) => {
        if (sortOption === "priceAsc") return a.price - b.price;
        if (sortOption === "priceDesc") return b.price - a.price;
        return 0;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(state.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <OfferBanner/>
            {/* Sorting Dropdown */}
            <div className="mb-3 d-flex justify-content-end">
        <select className="form-select w-auto" onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">Sort by Price</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

            <div className="row g-4">
                {currentItems.map((el) => (
                    <div className="col-md-3" key={el.id}>
                        <Link to={`/Outlet/${el.category}/${el.id}`} className="text-decoration-none">
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
