import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto">
            <h5 className="fw-bold text-white">PUMA</h5>
            <p className="text-white">Forever Faster</p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
            <h6 className="text-uppercase fw-bold text-white">Shop</h6>
            <ul className="list-unstyled">
              <li>
                {" "}
                <Link className="nav-link text-light" to="/HomePage/:category">
                  Men
                </Link>
              </li>
              <li>
                {" "}
              <Link className="nav-link text-light" to="/HomePage/:category">
                  Women
                </Link>
              </li>
              <li>
                {" "}
                <Link className="nav-link text-light" to="/HomePage2/:category">
                  Kids
                </Link>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
            <h6 className="text-uppercase fw-bold text-white">Support</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Customer Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Track Order
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto">
            <h6 className="text-uppercase fw-bold text-white">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/PUMA/" className="text-white">
                <FaFacebookF />
              </a>
              <a href="https://x.com/PUMA?ref_src=" className="text-white">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/puma/?hl=en" className="text-white">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@PUMA" className="text-white">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <hr className="my-4 text-white" />

        <div className="text-center">
          <p className="mb-0 text-white">© 2026 Puma. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
