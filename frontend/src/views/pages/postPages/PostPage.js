/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId} 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React from "react";
import { getPostById } from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";
import NotFoundPage from "../tempPages/NotFoundPage";
import PostHead from "views/components/post/PostHead";
import Content from "views/components/post/Content";

export default function PostPage({ match }) {
  const info = getPostById(match.params.postId);
  if (!info) {
    return <NotFoundPage />;
  }
  const { postId, author, type } = info;

  return (
    <div>
      <div className="postHeadBack">
        <BackBtn />
        <PostHead postId={postId} type={type} author={author} />
      </div>
      <div className="postingInfo">
        <div className="postingBack">
          <Content info={info} />
        </div>
      </div>
    </div>
  );
}
