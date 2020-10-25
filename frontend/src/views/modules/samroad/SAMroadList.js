/* Container 가 아닌 presentational component */
import React from "react";
import { useSelector } from "react-redux";
import Post from "views/components/post/Post";

export default function SAMroadList({ samroads, quword }) {
  // keyword 에 따라 post 를 filter
  const keyword = useSelector(state => state.search.keyword);
  /*
  const filtered = samroads.filter(
    samroad =>
      samroad.contents.tags.indexOf(quword ? quword : keyword) !== -1 ||
      samroad.contents.title.indexOf(quword ? quword : keyword) !== -1
  ); // tag 또는 title 에 일치하는 검색어가 있는 것만 표시
    */
  return (
    <div>
      {samroads.map(samroad => (
        <Post info={samroad} />
      ))}
    </div>
  );
}
