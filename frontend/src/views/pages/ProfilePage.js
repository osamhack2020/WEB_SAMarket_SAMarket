/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React from "react";
import { users } from "../../data/users.json";
import "./Pages.css";

export default function ProfilePage({ match }) {
  // Routing 만 할 뿐 실제 렌더링은 하지 않음
  const user = users[match.params.userId];
  return <div>{user.name}</div>;
}
