import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Shoes() {
  const [state, setState] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    fetch("https://puma-react.onrender.com/Shoes")
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  }, []);

  const openModal = (img) => {
    setSelectedImg(img);
    modalRef.current.click();
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {state.map((el) => (
          <div className="col-md-3" key={el.id}>
            <Link to={`/Outlet/${el.category}/${el.id}`} className="text-decoration-none">
              <div className="card shadow-lg p-2 bg-white rounded">
                <img
                  src={el.img}
                  alt={el.title}
                  className="card-img-top img-fluid"
                  onClick={(e) => {
                    e.preventDefault(); 
                    openModal(el.img);
                  }}
                  style={{ cursor: "pointer" }}
                />
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

    
      <button type="button" className="d-none" ref={modalRef} data-bs-toggle="modal" data-bs-target="#imageModal"></button>

     
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-center">
              {selectedImg && <img src={selectedImg} alt="Large View" className="img-fluid rounded shadow" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
