import React from 'react';
import { Link } from 'react-router-dom';

export default function OfferBanner() {
  return (
    <div>
      <div className="text-white text-center py-4 mb-5" style={{ background: "rgb(137, 123, 90)" }}>
        <p className="m-0 fw-bold">
          EXTRA 10% OFF ON ORDERS ABOVE ₹4499*  
          <br />
          <span className="fw-normal">Discount auto-applied at checkout | * Exclusions Apply</span>
        </p>
        <div className="d-flex justify-content-center gap-3 mt-2">
          <Link to={`/HomePage/:category`} className="btn btn-light btn-sm fw-bold">FOR HIM</Link>
          <Link to={`/Women/:category`} className="btn btn-light btn-sm fw-bold">FOR HER</Link>
          <Link to={`/HomePage2/:category`} className="btn btn-light btn-sm fw-bold">FOR KIDS</Link>
        </div>
      </div>
    </div>
  );
}
