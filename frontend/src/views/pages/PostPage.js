/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React from "react";
import { Route } from "react-router-dom";
import { posts } from "../../data/posts.json";
import PostHead from "../components/post/PostHead";
import Content from "../components/post/Content";
import MainPage from "./MainPage";
import "./Pages.css";

export default function PostPage({ match }) {
  // Routing 만 할 뿐 실제 렌더링은 하지 않음
  return (
    <div>
      <Route path={`${match.url}/:postId`} component={PostInfo} />
    </div>
  );
}

function PostInfo({ match }) {
  // postId 로 post 정보를 렌더링 함
  const info = posts[match.params.postId];
  const { postId, author, type } = info;
  const onSearch = data => {
    return <MainPage searchWord={data.keyword} />;
  };

  return (
    <div className="HeadBack">
      <PostHead postId={postId} type={type} author={author} />
      <Content info={info} onSearch={onSearch} />
    </div>
  );
}
