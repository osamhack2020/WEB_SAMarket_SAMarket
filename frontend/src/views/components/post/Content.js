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
  const { id, content, type, clr, tags, title, sub } = info;
  console.log(info);
  const color = clr | { back: "#8990A0", font: "#202326", tag: "#505560" };
  console.log(clr);

  return (
    <ContentBack back={color.back} className="content">
      <Link to={`/posts/${id}`} className="contentLink" />
      <Title font={color.font} className="contentTitle">{title}</Title>
      <Sub font={color.font} className="contentSub">
        {sub ? sub + (type === "sell" ? " 원" : "") : ""}
      </Sub>
      <TagList clr={color} texts={[]} />
      {disable && <div className="contentDisable" />}
    </ContentBack>
  );
}
