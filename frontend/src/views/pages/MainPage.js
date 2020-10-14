import React, { useState } from "react";
import Header from "../components/header/Header";
import PostList from "../components/post/PostList";
import MenuBar from "../components/menubar/MenuBar";
import SAMroad from "../../modules/samroad/SAMroad";
import "./Pages.css";

export default function MainPage({ searchWord }) {
  // 검색어가 들어오면 해당 검색어로 검색
  const [keyword, setKeyword] = useState(
    searchWord !== undefined ? searchWord : ""
  );

  const handleSearch = data => {
    /* 키워드 변경시 호출 */
    setKeyword(data.keyword);
  };

  return (
    <div className="MainPage">
      <Header onSearch={handleSearch} />
      <SAMroad />
      <MenuBar />
    </div>
  );
}
