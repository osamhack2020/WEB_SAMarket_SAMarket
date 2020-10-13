/* Tag의 List 를 보여주는 Component */
import React from "react";
import Tag from "./Tag";
import "./Tag.css";

export default function TagList({ clr, texts, onSearch }) {
  return (
    <div className="tags">
      {texts.map(text => (
        <Tag clr={clr} text={text} onSearch={onSearch} />
      ))}
    </div>
  );
}
