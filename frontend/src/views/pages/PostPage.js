/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React from "react";
import { samroads } from "../../data/samroads.json";
import NotFoundPage from "./NotFoundPage";
import PostHead from "../components/post/PostHead";
import Content from "../components/post/Content";
import BackBtn from "../components/header/BackBtn";
import "./Pages.css";

export default function PostPage({ match }) {
  const info = samroads[match.params.postId];
  if (!info) {
    return <NotFoundPage />;
  }
  const { postId, author, type } = info;

  return (
    <div className="HeadBack">
      <BackBtn size={[25, 25]} loc={[20, 10]} />
      <PostHead postId={postId} type={type} author={author} />
      <Content info={info} />
    </div>
  );
}
