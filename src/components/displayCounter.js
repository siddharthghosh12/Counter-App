import React from "react";
import "./displayCounter.css";

const DisplayCounter = ({ value }) => {
  return (
    <div className="displayCounter">
      <span className="text">Counter value: {value}</span>
    </div>
  );
};

export default DisplayCounter;
