/* 게시글 내부의 정보를 요약해서 보여주는 Component */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TagList from "../tag/TagList";
import "./Post.css";

export default function Content({ info, disable = false }) {
  const { postId, contents, type } = info;
  const { title, sub, tags, clr } = contents;
  const color = clr
    ? clr
    : { back: "#8990A0", font: "#202326", tag: "#505560" };
  const ContentBack = styled.div`
    background: ${color.back};
  `;
  const Title = styled.div`
    color: ${color.font};
  `;
  const Sub = styled.div`
    color: ${color.font};
  `;

  return (
    <ContentBack className="content">
      <Link to={`/posts/${postId}`} className="contentLink" />
      <Title className="contentTitle">{title}</Title>
      <Sub className="contentSub">
        {sub ? sub + (type === "sell" ? " 원" : "") : ""}
      </Sub>
      <TagList clr={color} texts={tags.slice(0, 5)} />
      {disable && <div className="contentDisable" />}
    </ContentBack>
  );
}
