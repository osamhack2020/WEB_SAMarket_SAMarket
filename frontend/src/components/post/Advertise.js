import React from "react";
import PostHead from "./PostHead";
import "./Post.css";

const Advertise = ({ info }) => {
  const { post_id, author, contents } = info;
  const { clr, title } = contents;
  const advStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: 340,
    height: 190,
    border: 0,
    outline: 0,
    borderRadius: 20,
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 25,
    color: clr.font,
    background: `linear-gradient(to bottom, #FDFEFF 1%, ${clr.back})`
  };
  return (
    <div className="adv">
      <button style={advStyle}>{title}</button>
      <PostHead post_id={post_id} type="post" author={author} />
    </div>
  );
};

export default Advertise;
