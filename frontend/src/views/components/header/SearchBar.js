/* 게시글을 검색할 수 있는 Component
게시글의 제목에 있는 음절 or Tag 를 검색할 수 있음
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeKeyword } from "views/modules/search/state";
import "./Header.css";

export default function SearchBar() {
  // class 에서 state 로 관리하던 것을 value, setter 로 얻어옴
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSearch = e => {
    e.preventDefault(); // 리로딩 방지
    dispatch(changeKeyword(keyword));
    //TODO: 검색 결과에 검색어 tag 형식으로 띠우기
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        className="searchBar"
        placeholder="검색어 입력"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button className="magnifier" type="submit" />
    </form>
  );
}
