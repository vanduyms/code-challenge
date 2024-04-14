import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Loading from "../Loading";

function SelectToken({ setShow, setToken }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.log(err));

    setLoading(false);
  }, []);

  const handleClickItem = (item) => {
    setToken(item);
    setShow(false);
  };

  return (
    <div className="selectToken">
      <div className="tokensContainer">
        <p className="title">Select a token</p>
        <div className="divider"></div>
        <button className="closeBtn" onClick={() => setShow(false)}>
          &times;
        </button>
        <ul className="tokens">
          {loading && <Loading />}
          {data.length > 0 &&
            data?.map((item, index) => (
              <li
                className="tokenItem"
                key={index}
                onClick={() => handleClickItem(item)}
              >
                <img src={`./tokens/${item.currency}.svg`} alt="tokenIcon" />
                <p>{item.currency}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectToken;
