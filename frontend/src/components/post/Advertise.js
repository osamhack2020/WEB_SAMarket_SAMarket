/* 광고 게시글 Component */
import React from "react";
import PostHead from "./PostHead";
import "./Post.css";

export default function Advertise({ info }) {
  const { post_id, author, contents } = info;
  const { clr, title } = contents;
  const advStyle = {
    color: clr.font,
    background: `linear-gradient(to bottom, #FDFEFF 1%, ${clr.back})`
  };
  return (
    <div className="adv">
      <button style={advStyle} className="advBack">
        {title}
      </button>
      <PostHead post_id={post_id} type="post" author={author} />
    </div>
  );
}
