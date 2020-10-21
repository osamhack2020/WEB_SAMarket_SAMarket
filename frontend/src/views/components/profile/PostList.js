import React, { useState } from "react";
import { getWhosePosts } from "views/modules/common/fakeServer";
import HorizontalScroller from "../base/HorizontalScroller";
import Post, { EmptyPost } from "../post/Post";

export default function PostList({ user }) {
  const posts = getWhosePosts(user.id);
  const [wantMore, setMore] = useState(false);
  return (
    <div>
      <HorizontalScroller target="PostList" delta={300} margin={5}>
        <div className="hScrlTitle">{user.name}의 강군로드</div>
        {posts.slice(0, 5).map(post => {
          return (
            <div
              className={`postContainer ${
                post.type === "adv" ? "advPost" : ""
              }`}
            >
              <Post info={post} />
            </div>
          );
        })}
        {posts.length === 0 && (
          <div className="postContainer emptyPost">
            <EmptyPost
              user={user}
              title={"세상에!"}
              sub={"아직 게시한 글이 없습니다.."}
            />
          </div>
        )}
        {posts.length > 5 && (
          <div className="postContainer">
            <button className="btn wantMore" onClick={() => setMore(!wantMore)}>
              {wantMore ? "접기" : "더보기"}
            </button>
          </div>
        )}
      </HorizontalScroller>

      {wantMore &&
        posts.slice(5, posts.length).map(post => {
          return (
            <div style={{ textAlign: "left" }}>
              <Post info={post} />
            </div>
          );
        })}
    </div>
  );
}
