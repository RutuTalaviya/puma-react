import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage6() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    fetch("https://puma-react.onrender.com/HomeProduct6")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setstate(data);
      });
  }, []);
  return (
    <div>
      {state.map((el) => {
        return (
          <>
           <h1 className="text-center d-flex justify-content-center align-items-center mx-auto p-4">
  GEAR UP FOR SPORTS
</h1>
          <Link to={`/HomePage4/${el.category}`} >
         

  <div className="d-flex gap-3 flex-wrap justify-content-center mt-3 ">
    <img src={el.img1} alt="" className="img-fluid rounded" style={{ maxWidth: "250px", height: "auto" }} />
    <img src={el.img2} alt="" className="img-fluid rounded" style={{ maxWidth: "250px", height: "auto" }} />
    <img src={el.img3} alt="" className="img-fluid rounded" style={{ maxWidth: "250px", height: "auto" }} />
    <img src={el.img4} alt="" className="img-fluid rounded" style={{ maxWidth: "250px", height: "auto" }} />
    <img src={el.img5} alt="" className="img-fluid rounded" style={{ maxWidth: "250px", height: "auto" }} />
  </div>
</Link>

 
          </>
        );
      })}
    </div>
  );
}
