import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setText }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter a valid name!");
      return;
    }
    setText(name);
    navigate("/HomePage");
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg border-0 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center">
          <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="User Icon" width="80" />
          <h2 className="mt-3 fw-bold text-primary">My Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-3">
          
          {/* Name Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input 
              type="text" 
              className="form-control p-2 border rounded-3" 
              placeholder="Enter Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input 
              type="email" 
              className="form-control p-2 border rounded-3" 
              placeholder="Enter Email" 
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              className="form-control p-2 border rounded-3" 
              placeholder="Enter Password" 
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 fw-bold rounded-3">Register</button>

          {/* Divider */}
          <div className="text-center my-3 text-muted">— OR —</div>

          {/* Google Login */}
          <button className="btn btn-light w-100 border rounded-3 shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" width="20" className="me-2" />
            Sign in with Google
          </button>

        </form>
      </div>
    </div>
  );
}
