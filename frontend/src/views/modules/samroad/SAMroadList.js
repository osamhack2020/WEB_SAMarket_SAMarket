/* Container 가 아닌 presentational component */
import React from "react";
import { useSelector } from "react-redux";
import Post from "../../components/post/Post";

export default function SAMroadList({ samroads }) {
  // keyword 에 따라 post 를 filter
  const keyword = useSelector(state => state.search.keyword);
  const filtered = samroads.filter(
    samroad =>
      samroad.contents.tags.indexOf(keyword) !== -1 ||
      samroad.contents.title.indexOf(keyword) !== -1
  ); // tag 또는 title 에 일치하는 검색어가 있는 것만 표시

  return (
    <ul>
      {filtered.map(samroad => (
        <Post info={samroad} />
      ))}
    </ul>
  );
}
