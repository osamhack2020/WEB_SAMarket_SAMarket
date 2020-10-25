/* 게시글 내부의 정보를 요약해서 보여주는 Component */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TagList from "../tag/TagList";
import "./Post.css";

const ContentBack = styled.div`
background: ${props => props.back};
`;
const Title = styled.div`
color: ${props => props.font};
`;
const Sub = styled.div`
color: ${props => props.font};
`;

export default function Content({ info, disable = false }) {
  const { postId, contents, type } = info;
  const { title, sub, tags, clr } = contents;
  const color = clr
    ? clr
    : { back: "#8990A0", font: "#202326", tag: "#505560" };


  return (
    <ContentBack back={clr.back} className="content">
      <Link to={`/posts/${postId}`} className="contentLink" />
      <Title font={clr.font} className="contentTitle">{title}</Title>
      <Sub font={clr.font} className="contentSub">
        {sub ? sub + (type === "sell" ? " 원" : "") : ""}
      </Sub>
      <TagList clr={color} texts={tags.slice(0, 5)} />
      {disable && <div className="contentDisable" />}
    </ContentBack>
  );
}
