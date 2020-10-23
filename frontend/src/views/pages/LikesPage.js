/* 사용자가 좋아한 게시물을 모아두는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SAMroad from "../modules/samroad/SAMroad";
import "./Pages.css";

export default function LikesPage() {
  const authToken = useSelector(state => state.sign.authToken);
  if (authToken) {
    return (
      <div className="MainPage">
        {/*<LikesHeader />*/}
        <SAMroad />
      </div>
    );
  }
  return <Redirect to="/sign" />;
}
