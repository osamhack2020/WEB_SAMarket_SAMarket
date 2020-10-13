import React, { useState } from "react";
import Header from "../components/header/Header";
import PostList from "../components/post/PostList";
import MenuBar from "../components/menubar/MenuBar";
import defaultState from "../../data/posts.json";
import "./Pages.css";

export default function MainPage({ searchWord }) {
  const [state, setState] = useState(defaultState);
  const { posts, keyword } = state;
  // 검색어가 들어오면 해당 검색어로 검색
  if (searchWord !== undefined) keyword = searchWord;

  const handleSearch = data => {
    /* 키워드 변경시 호출 */
    setState({
      ...state,
      keyword: data.keyword
    });
  };

  return (
    <div className="MainPage">
      <Header onSearch={handleSearch} />
      <PostList // tag 또는 title 에 keyword 가 있는 것만 표시
        posts={posts.filter(
          post =>
            post.contents.tags.indexOf(keyword) !== -1 ||
            post.contents.title.indexOf(keyword) !== -1
        )}
        onSearch={handleSearch}
      />
      <MenuBar />
    </div>
  );
}
