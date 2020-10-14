/* 검색 가능한 Tag 를 보여주는 Component */
import React from "react";
import { useDispatch } from "react-redux";
import { changeKeyword } from "../../../modules/search/state";
import { Link } from "react-router-dom";
import "./Tag.css";

export default function Tag({ clr, text }) {
  const dispatch = useDispatch();
  const tagClick = () => {
    dispatch(changeKeyword(text));
  };

  // 기본 값을 할당
  const color = { font: "#FDFEFF", tag: "#505560", ...clr };
  const tagBtn = {
    background: color.tag
  };
  const tagLink = {
    color: color.font,
    textDecoration: "none"
  };

  return (
    <button style={tagBtn} className="tag" onClick={tagClick}>
      <Link style={tagLink} to="/">
        # {text}
      </Link>
    </button>
  );
}
