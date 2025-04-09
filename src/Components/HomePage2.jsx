import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function HomePage2() {
    const [state, setstate] = useState([]);

    useEffect(()=>{
        fetch("https://puma-react.onrender.com/HomeProduct2")
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
               KID'S WEAR
            </h1>
              <Link to={`/HomePage2/${el.category}`}>
                <img src={el.img} alt="{el.category}" style={{width:"100%"}} />
                </Link>
            
                </>
            )
        })
    }
    </div>
  );
}
