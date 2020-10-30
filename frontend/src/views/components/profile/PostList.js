import React, { useState, useEffect } from "react";
import { getWhosePosts, getEmptyPost } from "views/modules/common/fakeServer";
import HorizontalScroller from "../base/HorizontalScroller";
import Post from "../post/Post";
import { getPostListByType, getPostByUserID } from "api";

export default function PostList({ user }) {
  const [posts, setPosts] = useState([]);
  const [wantMore, setMore] = useState(false);

  useEffect(() => {
    getPostByUserID(user.id).then(response => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <div className="section-header">{user.name}의 강군로드</div>
      {posts.slice(0, 5).map(post => (
        <div className={`postContainer ${post.type === "adv" ? "adVer" : ""}`}>
          <Post key={post.id} info={post} />
        </div>
      ))}
      {posts.length === 0 && (
        <div className="emptyFriend">
          게시한 글이 없어요
        </div>
      )}
      {posts.length > 5 && (
        <div className="postContainer">
          <button className="btn wantMore" onClick={() => setMore(!wantMore)}>
            {wantMore ? "접기" : "더보기"}
          </button>
        </div>
      )}

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
