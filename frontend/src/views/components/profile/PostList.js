import React from "react";
import HorizontalScroller from "../base/HorizontalScroller";

export default function PostList({ user }) {
  return (
    <HorizontalScroller target="PostList" delta={300}>
      <div className="hScrlTitle?">{user.name}의 강군로드</div>
    </HorizontalScroller>
  );
}
