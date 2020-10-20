/* 사용자가 게시물을 작성하는 페이지
 */
import React, { Fragment, useState } from "react";
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
    getInitialPostInfo(useSelector(state => state.sign.userInfo))
  ); // 정해진 포맷을 받음
  const updateInfo = getPostInfoUpdater(info, setInfo);

  return (
    <Fragment>
      <div className="postHeadBack backdropBlur">
        <BackBtn />
        <div className={`writeHead ${info.contents.title ? "" : "emptyTitle"}`}>
          {info.contents.title ? info.contents.title : "포스팅 제목"}
        </div>
      </div>
      <div className="postingInfo" style={{ marginBottom: 30 }}>
        <div className="postingBack">
          <Content info={info} disable={true} />
          <WriteForm info={info} updateInfo={updateInfo} />
        </div>
      </div>
    </Fragment>
  );
}
