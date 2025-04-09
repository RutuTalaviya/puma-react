import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function HomePage5() {
    const [state, setstate] = useState([]);

    useEffect(()=>{
        fetch("https://puma-react.onrender.com/HomeProduct5")
        .then((res)=>{
            return res.json()
        }).then((data)=>{
            setstate(data)
        })
    },[])
  return (
    <div>
   
    {
        state.map((el)=>{
            return(
                <>
              
            <Link to={`/HomePage4/${el.category}`} >
            <div className="container mt-5 d-flex  gap-3">
  <div className="row g-3 justify-content-center text-align-center">
    <div className="col-md-4">
      <img src={el.img1} alt={el.category} className="img-fluid rounded" style={{height:"70vh"}} />
    </div>
    <div className="col-md-4">
      <img src={el.img2} alt={el.category} className="img-fluid rounded"  style={{height:"70vh"}} />
    </div>
    <div className="col-md-4">
      <img src={el.img3} alt={el.category} className="img-fluid rounded"  style={{height:"70vh"}}/>
    </div>
  </div>
</div>


</Link>

            
                </>
            )
        })
    }
    </div>
  );
}
