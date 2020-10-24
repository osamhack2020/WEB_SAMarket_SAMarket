/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId} 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React, { Fragment, useState, useEffect, useRef } from "react";
import NotFoundPage from "../NotFoundPage";
import ReplyInput from "../../components/reply/ReplyInput";
import ReplyList from "../../components/reply/ReplyList";

export default function PostPage({ match }) {
  return (
    <Fragment>
      <div className="postHeadBack backdropBlur">
      </div>
      <div className="postingInfo">
        <div id="postingContent">
          <PostingContent />
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
  }, []);
  // '답글달기' 누르면 입력창으로 커서 이동
  const ref = useRef();
  const inputFocus = () => {
    console.log(ref.current);
    ref.current && ref.current.focus();
  }; 

  return (
    <div>
      <div className="replies">
      <ReplyList inputFocus={inputFocus} />
      </div>
      {pageY >= norm && (
        <ReplyInput
          message={message}
          setMessage={setMessage}
          sendMessage={() => setMessage("")}
          inputRef={ref}
        />
      )}
    </div>
  );
}
