import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function HomePage7() {
    const [state, setstate] = useState([]);

    useEffect(()=>{
        fetch("https://puma-react.onrender.com/HomeProduct7")
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
             
              <Link to={`/HomePage7/${el.category}`} >
                <img src={el.img1} alt="{el.category}" style={{width:"100%"}} className="mt-5" />
                </Link>
            
                </>
            )
        })
    }
    </div>
  );
}
