import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loadingcontainer">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="text">&nbsp;&nbsp;Saving counter value</span>
    </div>
  );
};

export default Loader;
