/* 게시글의 타입에 따라 게시글을 보여주는 Component */
import React from "react";
import Advertise from "./Advertise";
import PostHead from "./PostHead";
import Content from "./Content";
import "./Post.css";


export default function Post({ info }) {
  const { postId, author, type } = info;
  if (type === "adv") return <Advertise info={info} />;
  return (
    <div className="post">
      <PostHead info={info} author={author} />
      <Content info={info} />
    </div>
  );
}
