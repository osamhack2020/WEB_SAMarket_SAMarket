/* 광고 게시글 Component */
import React from "react";
import PostHead from "./PostHead";
import "./Post.css";

export default function Advertise({ info }) {
  const { postId, author, contents } = info;
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
      <PostHead postId={postId} type="post" author={author} />
    </div>
  );
}
