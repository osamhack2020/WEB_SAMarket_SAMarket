/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId} 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React, { Fragment, useState } from "react";
import { getPostById } from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";
import NotFoundPage from "../tempPages/NotFoundPage";
import PostHead from "views/components/post/PostHead";
import Content from "views/components/post/Content";
import ChatInput from "views/components/chat/ChatInput";

export default function PostPage({ match }) {
  const [message, setMessage] = useState("");
  const info = getPostById(match.params.postId);
  if (!info) {
    return <NotFoundPage />;
  }
  const { postId, author, type } = info;

  return (
    <Fragment>
      <div className="postHeadBack">
        <BackBtn />
        <PostHead postId={postId} type={type} author={author} />
      </div>
      <div className="postingInfo">
        <div className="postingBack">
          <Content info={info} />
          <div className="postingContent">
            {info.contents.content.split("\n").map(line => (
              <span>
                {line}
                <br />
              </span>
            ))}
            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={() => setMessage("")}
            />
          </div>
        </div>
        <div className="replies" />
      </div>
    </Fragment>
  );
}
