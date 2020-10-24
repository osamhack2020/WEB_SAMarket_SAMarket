/* 별점 매기기 */
import React, { useEffect } from "react";
import "./Rate.css";

export default function Star({ rate, setRate, freeze, id }) {
  // 1 점을 두 번 누르면 0점
  const setStar = idx => {
    return () => {
      const stars = document
        .getElementById(`star${id}`)
        .getElementsByClassName("star");
      for (let i = 0; i < 10; i++)
        stars[i].className = stars[i].className.slice(0, 15);
      if (!(rate === 1 && idx === 0))
        for (let i = 0; i <= idx; i++) stars[i].className += " on";
      if (setRate) setRate(idx + 1);
    };
  };

  useEffect(() => {
    if (rate !== undefined) setStar(rate - 1)();
  }, []);

  return (
    <div className="Stars" id={`star${id}`}>
      {[0, 1, 2, 3, 4].map(idx => (
        <span className="starContainer">
          <span
            class="star star_left  on"
            onClick={freeze ? null : setStar(2 * idx)}
          ></span>
          <span
            class="star star_right on"
            onClick={freeze ? null : setStar(2 * idx + 1)}
          ></span>
        </span>
      ))}
    </div>
  );
}
