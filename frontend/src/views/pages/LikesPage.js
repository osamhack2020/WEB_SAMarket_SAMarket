/* 사용자가 좋아한 게시물을 모아두는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BackBtn from "views/components/header/BackBtn";
import SearchBar from "views/components/header/SearchBar";
import SAMroadList from "../modules/samroad/SAMroadList";
import "./Pages.css";
import { getFavorites } from "api";

export default function LikesPage() {
  const [keyword, setKeyword] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getFavorites().then(response => {
      setPostList(response.data);
    })
  }, []);

  return (
    <div className="LikesPage">
      <LikesHeader setKeyword={setKeyword} />
      <SAMroadList samroads={postList} quword={keyword} />
    </div>
  );
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
