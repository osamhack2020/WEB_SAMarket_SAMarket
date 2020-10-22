/* 별점 매기기 */
import React, { useState } from "react";
import "./Stars.css";

export default function Star() {
  const [rate, setRate] = useState(10);
  const setStar = idx => {
    return () => {
      const stars = document.getElementsByClassName("star");
      for (let i = 0; i < 10; i++)
        stars[i].className = stars[i].className.slice(0, 15);
      for (let i = 0; i <= idx; i++) stars[i].className += " on";
      setRate(idx + 1);
    };
  };
  return (
    <div className="Stars">
      {[0, 1, 2, 3, 4].map(idx => (
        <span className="starContainer">
          <span class="star star_left  on" onClick={setStar(2 * idx)}></span>
          <span
            class="star star_right on"
            onClick={setStar(2 * idx + 1)}
          ></span>
        </span>
      ))}
    </div>
  );
}
