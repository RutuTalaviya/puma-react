import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function HomePage4() {
    const [state, setstate] = useState([]);

    useEffect(()=>{
        fetch("https://puma-react.onrender.com/HomeProduct4")
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
               <h1 className="text-center d-flex justify-content-center align-items-center mx-auto p-4">
               YOUR FAVOURITE TEAMS ARE BACK
            </h1>
            <Link to={`/HomePage4/${el.category}`} className="d-flex justify-content-center gap-3">
            <img src={el.img1} alt={el.category} className="w-50 vh-100" />
<img src={el.img2} alt={el.category} className="w-50 vh-100" />

</Link>

            
                </>
            )
        })
    }
    </div>
  );
}
