import React, { useState, useEffect, useRef } from "react";
import "./counter.css";
import api from "../api";
import Loader from "./loader";

const Counter = () => {
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  let ref = useRef(0);

  useEffect(() => {
    const getCount = async () => {
      console.log("running");
      try {
        let response = await api.get("/siddharthghosh.json");
        console.log(response.data, "data");
        if (response.status === 200) {
          if (response.data !== null) setCount(Number(response.data));
        }
      } catch (err) {
        console.log(err);
      }
    };

    //console.log(ref.current, "refinget");
    getCount();
  }, []);

  useEffect(() => {
    const updateCount = async () => {
      try {
        setIsLoading(!isLoading);
        let response = api.put(".json", {
          siddharthghosh: count,
        });

        if (response.status === 200) {
          setIsLoading(!isLoading);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (ref.current !== 0) updateCount();
  }, [count]);

  return (
    <div className="outerContainer">
      <div id="loader">
        <Loader />
      </div>
      <div className="container">
        <div
          id="minus"
          onClick={() => {
            if (Number(count) > 1) setCount(Number(count) - 1);

            ref.current = 1;
          }}
        >
          -
        </div>
        <input
          id="counter"
          value={String(count)}
          type="text"
          onChange={(e) => {
            if (Number(e.target.value) !== NaN) {
              if (Number(e.target.value) < 1) setCount(1);
              else if (Number(e.target.value) > 1000) setCount(1000);
              else setCount(Number(e.target.value));
            }

            if (isNaN(Number(e.target.value))) setCount(1);
            ref.current = 1;
          }}
        />
        <div
          id="plus"
          onClick={() => {
            if (Number(count) < 1000) {
              setCount(Number(count) + 1);
              console.log(Number(count));
            }
            ref.current = 1;
          }}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default Counter;
