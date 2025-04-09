import React, { useState, useEffect } from "react";

export default function Racing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://puma-react.onrender.com/Racing")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">RACING CLASSICS</h1>
      <div className="row g-4">
        {data.map((el, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-3">
            <div className="card shadow-lg border-0">
              <img
                src={el.img}
                alt={el.title}
                className="card-img-top img-fluid rounded"
              />
              <div className="card-body text-center">
                <h5 className="fw-bold">{el.title}</h5>
                <h6 className="text-success">${el.price}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container text-center mt-4">
  <h1 className="fw-bold mb-3">READY. SET. GO.</h1>
  <p className="fs-5 text-muted">
    Unleash your inner racer with the PUMA Archive Seasonal racer jacket. 
    Featuring a stand collar, sleek badges, and secure welt pockets, it's all about the details. 
    Ribbed cuffs and hem ensure a snug fit, while bold PUMA branding completes the look.
  </p>
</div>

<div className="text-center">
    <img 
        src="https://i.postimg.cc/RV4H7K54/IMG-20250221-WA0013.jpg" 
        alt="Responsive Image" 
        className="img-fluid rounded shadow-lg d-block mx-auto"
    />
</div>
<div className="container mt-4">
    <div className="row g-3">
        <div className="col-md-4 col-12">
            <img src="https://i.postimg.cc/TwqWFqZd/IMG-20250221-WA0015.jpg" alt="Image 1" className="img-fluid rounded shadow-lg d-block mx-auto" />
        </div>
        <div className="col-md-4 col-12">
            <img src="https://i.postimg.cc/59sXz0JR/IMG-20250221-WA0016.jpg" alt="Image 2" className="img-fluid rounded shadow-lg d-block mx-auto" />
        </div>
        <div className="col-md-4 col-12">
            <img src="https://i.postimg.cc/d0R1VQnn/IMG-20250221-WA0014.jpg" alt="Image 3" className="img-fluid rounded shadow-lg d-block mx-auto" />
        </div>
    </div>
</div>



     </div>
  );
}
