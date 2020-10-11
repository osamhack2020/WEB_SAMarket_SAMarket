import React from "react";
import Tag from "./Tag";
import "./Post.css";

const Content = ({ contents, type, onSearch }) => {
  const { title, sub, tags, clr } = contents;
  const contentStyle = {
    position: "absolute",
    top: "60px",
    left: "20px",
    width: "300px",
    height: "300px",
    border: 0,
    outline: 0,
    borderRadius: "20px",
    background: clr.back || "#8990A0",
    boxShadow: "0 0 15px 0 rgba(80,80,80,30%)"
  };

  const titleStyle = {
    position: "relative",
    textAlign: "center",
    fontWeight: "bold",
    color: clr.font,
    fontSize: "30px",
    marginTop: "25px"
  };

  const subStyle = {
    textAlign: "center",
    fontWeight: "bold",
    color: clr.font,
    fontSize: "25px",
    marginTop: "5px"
  };

  const switchPostPage = () => {
    /* Post 상세 페이지로 전환 */
  };

  return (
    <button style={contentStyle} onClick={switchPostPage}>
      <div style={titleStyle}>{title}</div>
      <div style={subStyle}>{sub + (type === "sell" ? " 원" : "")}</div>
      <div className="tags">
        {tags.slice(0, 5).map(tag => (
          <Tag clr={clr} text={tag} onSearch={onSearch} />
        ))}
      </div>
    </button>
  );
};

export default Content;
