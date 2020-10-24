/* 좌우 스크롤이 가능한 영역 */
import React from "react";
import "./Base.css";

export default function HorizontalScroller({
  children,
  target,
  delta,
  margin = 10
}) {
  const scrollX = deltaX =>
    (document.getElementById(target).scrollLeft += deltaX);

  return (
    <div class="HScroller">
      <div
        className="hScrollWrapper"
        style={{ margin: `0 ${margin}% 0 ${margin}%` }}
        id={target}
      >
        {children}
      </div>
      <button className="btn hScrollLeft" onClick={() => scrollX(-delta)} />
      <button className="btn hScrollRight" onClick={() => scrollX(delta)} />
    </div>
  );
}
