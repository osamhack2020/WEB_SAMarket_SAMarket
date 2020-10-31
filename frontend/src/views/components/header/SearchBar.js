/* 게시글을 검색할 수 있는 Component
게시글의 제목에 있는 음절 or Tag 를 검색할 수 있음
 */
import React, { useState } from "react";
import "./Header.css";

export default function SearchBar({ onSearch, realTime = false }) {
  // class 에서 state 로 관리하던 것을 value, setter 로 얻어옴
  const [keyword, setKeyword] = useState("");

  const handleSearch = e => {
    e.preventDefault(); // 리로딩 방지
    onSearch(keyword);
    setKeyword("");
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        className="searchBar"
        placeholder="검색어 입력"
        value={keyword}
        onChange={e => {
          setKeyword(e.target.value);
          if (realTime) onSearch(e.target.value);
        }}
      />
      <button className="btn magnifier" type="submit" />
    </form>
  );
}
