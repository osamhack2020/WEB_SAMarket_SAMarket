import React, { useState } from "react";
import { getWhosePosts, getEmptyPost } from "views/modules/common/fakeServer";
import HorizontalScroller from "../base/HorizontalScroller";
import Post from "../post/Post";

export default function PostList({ user }) {
  const posts = getWhosePosts(user.id);
  const [wantMore, setMore] = useState(false);

  return (
    <div>
      <HorizontalScroller target="PostList" delta={300} margin={0}>
        <div className="hScrlTitle">{user.name}의 강군로드</div>
        {posts.slice(0, 5).map(post => (
          <div
            className={`postContainer ${post.type === "adv" ? "adVer" : ""}`}
          >
            <Post info={post} />
          </div>
        ))}
        {posts.length === 0 && (
          <div className="postContainer emptyPost">
            <Post
              info={getEmptyPost(user, "세상에!", "게시한 글이 없습니다..")}
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
