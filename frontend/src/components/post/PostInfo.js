import React from "react";
import Advertise from "./Advertise";
import PostHead from "./PostHead";
import Content from "./Content";
import "./Post.css";

const PostInfo = ({ info, onSearch }) => {
  const { post_id, author, type, contents } = info;
  if (type === "adv") return <Advertise info={info} />;
  return (
    <div className="info">
      <PostHead post_id={post_id} type={type} author={author} />
      <Content type={type} contents={contents} onSearch={onSearch} />
    </div>
  );
};

export default PostInfo;
