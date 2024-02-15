import React from "react";
import "../LoaderScreen.js/hello.css"
import img from '../../images/img3.gif';

function LoaderScreen() {
  return (
    <div className="loader-container" >
      <img src={img} alt="Loading..." className=" loader-image"/>
    </div>
  );
}

export default LoaderScreen;
