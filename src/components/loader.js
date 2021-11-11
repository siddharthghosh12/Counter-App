import React from "react";
import "./loader.css";

const Loader = ({ message }) => {
  return (
    <div className="loadingcontainer">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="text">&nbsp;&nbsp;{message}</span>
    </div>
  );
};

export default Loader;
