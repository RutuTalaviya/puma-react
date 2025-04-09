import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomePage2 from './HomePage2';
import HomePage3 from './HomePage3';
import HomePage4 from './HomePage4';
import Shoes from './Shoes';
import HomePage5 from './HomePage5';
import HomePage6 from './HomePage6';
import HomePage7 from './HomePage7';
import video from './Assests/p.webm'


export default function HomePage() {
    const [state, setstate] = useState([]);

    useEffect(()=>{
        fetch("https://puma-react.onrender.com/HomeProduct")
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
                <Link to={`/HomePage/${el.category}`}>
                <img src={el.img} alt="{el.category}" style={{width:"100%"}} />
                </Link>
           <video src={video} className="img-fluid mt-5 " width="100%"  controls muted autoPlay></video>
            <HomePage2/>
            <HomePage3/>
            <HomePage4/>
           <Shoes/>
           <HomePage5/>
           <HomePage6/>
           <HomePage7/>
        



                </>
            )
        })
    }
    </div>
  );
}



