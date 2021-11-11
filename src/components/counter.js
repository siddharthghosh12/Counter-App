import React, { useState, useEffect, useRef } from "react";
import "./counter.css";
import api from "../api";
import Loader from "./loader";
import DisplayCounter from "./displayCounter";

const Counter = () => {
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [displayMsg, setDisplayMsg] = useState("");

  let ref = useRef(0);
  let timer = useRef(null);

  useEffect(() => {
    const getCount = async () => {
      try {
        let response = await api.get("/siddharthghosh.json");

        if (response.status === 200) {
          if (response.data !== null) setCount(Number(response.data));
        }
      } catch (err) {
        console.log(err);
      }
    };

    getCount();
  }, []);

  useEffect(() => {
    const updateCount = async () => {
      setDisplayMsg("Saving counter value");
      try {
        setIsLoading(true);
        let response = await api.put(".json", {
          siddharthghosh: count,
        });

        if (response.status === 200) {
          setIsLoading(false);
          setDisplayMsg("");
        }
      } catch (err) {
        console.log(err);
      }
    };

    const saveCount = function (fn, delta) {
      return function () {
        let context = this;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          updateCount.apply(context);
        }, delta);
      };
    };

    const update = saveCount(updateCount, 300);

    if (ref.current !== 0) update();
  }, [count]);

  return (
    <div className="outerContainer">
      {isLoading ? (
        <div id="loader">
          <Loader message={displayMsg} />
        </div>
      ) : null}
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
            }
            ref.current = 1;
          }}
        >
          +
        </div>
      </div>
      <DisplayCounter value={count} />
    </div>
  );
};

export default Counter;
