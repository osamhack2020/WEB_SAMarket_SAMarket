/* 광고 게시글 Component */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostHead from "./PostHead";
import "./Post.css";

const Title = styled.div`
  color: ${props => props.font};
  background: linear-gradient(to bottom, #fdfeff 1%, ${props => props.back});
`;

export default function Advertise({ info }) {
  const { postId, author, contents } = info;
  const { clr, title } = contents;
  return (
    <div className="adv">
      <Link to={`/posts/${postId}`} className="contentLink" />
      <Title font={clr.font} back={clr.back} className="advBack">{title}</Title>
      <PostHead postId={postId} type="post" author={author} />
    </div>
  );
}
