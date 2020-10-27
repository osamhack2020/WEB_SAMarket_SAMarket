/* 사용자가 게시물을 작성하는 페이지
 */
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getInitialPostInfo,
  getPostInfoUpdater
} from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";
import Content from "views/components/post/Content";
import WriteForm from "views/components/write/WriteForm";

export default function WritePage() {
  // Posting 을 작성하는 페이지
  const [info, setInfo] = useState(
    {
      title : "",
      content: "",
      tags: [],
      clr: {
        back: "#8990A0",
        font: "#202326",
        tag: "#505560"
      },
      type: "post",
    }
  ); // 정해진 포맷을 받음
  const updateInfo = getPostInfoUpdater(info, setInfo);

  useEffect(() => {
    window.scrollTo(0, 0); // 화면을 맨 위로
  }, []);

  return (
    <Fragment>
      <div className="postHeadBack backdropBlur">
        <BackBtn />
        <div className={`writeHead ${info.title ? "" : "emptyTitle"}`}>
          {info.title ? info.title : "포스팅 제목"}
        </div>
      </div>
      <div className="postingInfo" style={{ marginBottom: 0 }}>
        <div className="postingBack" style={{ borderRadius: 0 }}>
          <Content info={info} disable={true} />
          <WriteForm info={info} updateInfo={updateInfo} />
        </div>
      </div>
    </Fragment>
  );
}
