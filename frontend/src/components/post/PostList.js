/* 게시글 리스트를 보여주는 Component */
import React from "react";
import Post from "./Post";

export default function PostList({ posts, onSearch }) {
  const list = React.useMemo(
    () =>
      // shouldComponentUpdate 을 Hook 으로
      posts.map(post => (
        <Post key={post.post_id} info={post} onSearch={onSearch} />
      )),
    [posts] // posts 에 변화가 있는 경우에만 재 렌더링
  );
  return <div>{list}</div>;
}

PostList.defaultProps = {
  posts: []
};
