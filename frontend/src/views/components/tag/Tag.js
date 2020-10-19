/* 검색 가능한 Tag 를 보여주는 Component */
import React from "react";
import { useDispatch } from "react-redux";
import { changeKeyword } from "views/modules/search/state";
import { Link } from "react-router-dom";
import "./Tag.css";

const DEFAULT_FONT_CLR = "#FDFEFF";
const DEFAULT_TAG_CLR = "#505560";

export default function Tag({ clr, text }) {
  const dispatch = useDispatch();
  const tagClick = () => {
    dispatch(changeKeyword(text));
  };

  // 기본 값을 할당
  const color = { font: DEFAULT_FONT_CLR, tag: DEFAULT_TAG_CLR, ...clr };
  const tagBtn = {
    background: color.tag
  };
  const tagLink = {
    color: color.font,
    textDecoration: "none"
  };

  return (
    <button style={tagBtn} className="btn tag" onClick={tagClick}>
      <Link style={tagLink} to="/">
        # {text}
      </Link>
    </button>
  );
}
