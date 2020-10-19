/* 사용자가 게시물을 작성하는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInitialPostInfo } from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";

export default function WritePage() {
  // Posting 을 작성하는 페이지
  const [info, setInfo] = useState(
    getInitialPostInfo(useSelector(state => state.sign.userInfo))
  ); // 정해진 포맷을 받음
  const submitPosting = () => {};

  return (
    <Fragment>
      <div className="postHeadBack backdropBlur">
        <BackBtn />
        <div className={`writeHead ${info.contents.title ? "" : "emptyTitle"}`}>
          {info.contents.title ? info.contents.title : "포스팅 제목"}
        </div>
      </div>
      <div className="postingInfo">
        <form className="postingBack" onSubmit={submitPosting}>
          <input
            placeholder={"포스팅 제목"}
            value={info.contents.title}
            onChange={e => {
              setInfo({ ...info, contents: { title: e.target.value } });
            }}
            className="postInput"
            style={{ textAlign: "center" }}
          />
          <PostForm info={info} setInfo={setInfo} />
          <button className="btn postSubmitBtn" type="submit">
            게시하기
          </button>
        </form>
      </div>
    </Fragment>
  );
}

function PostForm({ info, setInfo }) {
  return <div>{info.author.id}</div>;
}
