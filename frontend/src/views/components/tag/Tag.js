/* 검색 가능한 Tag 를 보여주는 Component */
import React from "react";
import "./Tag.css";

export default function Tag({ clr, text, onSearch }) {
  // 기본 값을 할당하는 과정
  const color = { font: "#FDFEFF", tag: "#505560", ...clr };

  const tagStyle = {
    color: color.font,
    background: color.tag
  };
  const tagClick = () => {
    console.log("fuck");
    onSearch({ keyword: text });
  };

  return (
    <button className="tag" style={tagStyle} onClick={tagClick}>
      # {text}
    </button>
  );
}
