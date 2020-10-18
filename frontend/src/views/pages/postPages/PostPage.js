/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId} 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React, { Fragment, useState, useEffect } from "react";
import { getPostById } from "views/modules/common/fakeServer";
import NotFoundPage from "../tempPages/NotFoundPage";
import BackBtn from "views/components/header/BackBtn";
import PostHead from "views/components/post/PostHead";
import Content from "views/components/post/Content";
import ChatInput from "views/components/chat/ChatInput";

export default function PostPage({ match }) {
  const info = getPostById(match.params.postId);
  if (!info) return <NotFoundPage />;
  const { postId, author, type } = info;

  return (
    <Fragment>
      <div className="postHeadBack backdropBlur">
        <BackBtn />
        <PostHead postId={postId} type={type} author={author} />
      </div>
      <div className="postingInfo">
        <div id="postingContent">
          <PostingContent info={info} />
        </div>
        <PostingReplies />
      </div>
    </Fragment>
  );
}

function PostingContent({ info }) {
  // Posting 의 글 영역에 해당하는 component
  return (
    <div className="postingBack">
      <Content info={info} />
      <div className="postingContent">
        {info.contents.content.split("\n").map(line => (
          <span>
            {line}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}

function PostingReplies() {
  // Posting 의 댓글 대댓글 영역
  const [pageY, setPageY] = useState(0);
  const [norm, setNorm] = useState(0);
  const [message, setMessage] = useState("");

  const handleScroll = () => {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  };

  const calculateNorm = () => {
    setNorm(
      document.getElementById("postingContent").clientHeight -
        document.documentElement.clientHeight +
        55
    );
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    window.scrollTo(0, 0); // 화면을 맨 위로
    calculateNorm();
  }, []);
  // 창의 크기가 변하면, 기준도 다시 계산
  useEffect(() => {
    window.addEventListener("resize", calculateNorm);
    return () => window.removeEventListener("resize", calculateNorm);
  }, [norm]);

  return (
    <div>
      <div className="replies">댓글 대댓글 영역</div>
      {pageY >= norm && (
        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={() => setMessage("")}
        />
      )}
    </div>
  );
}
