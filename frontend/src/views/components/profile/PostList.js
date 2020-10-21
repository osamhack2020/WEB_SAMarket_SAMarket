import React from "react";
import { getPostById } from "views/modules/common/fakeServer";
import HorizontalScroller from "../base/HorizontalScroller";
import Post from "../post/Post";

export default function PostList({ user }) {
  const postIds = [5, 5, 1, 1, 5, 5, 1, 5, 1, 5];
  return (
    <HorizontalScroller target="PostList" delta={300}>
      <div className="hScrlTitle">{user.name}의 강군로드</div>
      {postIds.map(postId => {
        const post = getPostById(postId);
        return (
          <div
            className={`postContainer ${post.type === "adv" ? "advPost" : ""}`}
          >
            <Post info={post} />
          </div>
        );
      })}
    </HorizontalScroller>
  );
}
