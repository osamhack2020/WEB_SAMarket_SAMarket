/* 사용자가 좋아한 게시물을 모아두는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getLieks } from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";
import SearchBar from "views/components/header/SearchBar";
import SAMroadList from "../modules/samroad/SAMroadList";
import "./Pages.css";

export default function LikesPage() {
  const [keyword, setKeyword] = useState("");
  const likes = getLieks(useSelector(state => state.sign.userId));
  const authToken = useSelector(state => state.sign.authToken);
  if (authToken) {
    return (
      <div className="LikesPage">
        <LikesHeader setKeyword={setKeyword} />
        <SAMroadList samroads={likes} quword={keyword} />
      </div>
    );
  }
  return <Redirect to="/sign" />;
}

function LikesHeader({ setKeyword }) {
  return (
    <div className="listHead backdropBlur">
      마음에 든 게시물 목록
      <BackBtn loc={[32, 10]} />
      <SearchBar onSearch={keyword => setKeyword(keyword)} realTime={true} />
    </div>
  );
}
