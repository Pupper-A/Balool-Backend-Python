import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomeScreen() {
    const history= useNavigate();
    
    const redirect = "/dashboard"

    const userInfo = localStorage.getItem("userInfo")

    useEffect(() => {
      if(userInfo){
          history(redirect)
      }
  }, [history, userInfo, redirect])

  return (
    <div>
        <p>Home Screen</p>
    </div>
  )
}

export default HomeScreen