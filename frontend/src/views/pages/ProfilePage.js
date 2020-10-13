/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React from "react";
import { Route } from "react-router-dom";
import "./Pages.css";

export default function ProfilePage({ match }) {
  // Routing 만 할 뿐 실제 렌더링은 하지 않음
  return (
    <div>
      <Route path={`${match.url}/:userId`} component={ProfileInfo} />
    </div>
  );
}

function ProfileInfo({ match }) {
  // userId 로 profile 정보를 렌더링 함
  return <div>{match.params.userId}</div>;
}
