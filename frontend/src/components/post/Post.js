/* 게시글의 타입에 따라 게시글을 보여주는 Component */
import React from "react";
import Advertise from "./Advertise";
import PostHead from "./PostHead";
import Content from "./Content";
import "./Post.css";

export default function Post({ info, onSearch }) {
  const { post_id, author, type, contents } = info;
  if (type === "adv") return <Advertise info={info} />;
  return (
    <div className="info">
      <Content
        post_id={post_id}
        info={info}
        contents={contents}
        onSearch={onSearch}
      />
      <PostHead post_id={post_id} type={type} author={author} />
    </div>
  );
}
