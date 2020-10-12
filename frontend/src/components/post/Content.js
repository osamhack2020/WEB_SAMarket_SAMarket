/* 게시글 내부의 정보를 요약해서 보여주는 Component */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Tag from "./Tag";
import "./Post.css";

export default function Content({ post_id, contents, type, onSearch }) {
  const { title, sub, tags, clr } = contents;
  const Content = styled(Link)`
    background: ${clr.back || "#8990A0"};
  `;
  const Title = styled.div`
    color: ${clr.font};
  `;
  const Sub = styled.div`
    color: ${clr.font};
  `;

  return (
    <Content to={`/posts/${post_id}`} className="content">
      <Title className="contentTitle">{title}</Title>
      <Sub className="contentSub">{sub + (type === "sell" ? " 원" : "")}</Sub>
      <div className="tags">
        {tags.slice(0, 5).map(tag => (
          <Tag clr={clr} text={tag} onSearch={onSearch} />
        ))}
      </div>
    </Content>
  );
}
