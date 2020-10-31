/* rate history */
import React, { useEffect, useState } from "react";
import { reviewListPost } from "api";
import Content from "../post/Content";
import Profile from "../user/Profile";
import Star from "./Stars";

export default function SAHistory({ user, review }) {
  if (review && review.post) {
    return (
      <div className="SAHistory">
        <Content info={review.post} />
        <div className="comments">
          {review.my_review && review.my_review.writer_id.length > 0 && (
            <Comment
              review={review.my_review}
              postID={review.post.id}
              isSeller={review.my_review.writer_id == review.post.author.id}
            />
          )}
          {review.opp_review && review.opp_review.writer_id.length > 0 && (
            <Comment
              review={review.opp_review}
              postID={review.post.id}
              isSeller={review.opp_review.writer_id == review.post.author.id}
            />
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function Comment({ review, postID, isSeller }) {
  if (review.writer)
    return (
      <div className="Comment">
        <Profile userInfo={review.writer} size={45} />
        <div className="commentName">{review.writer.name}</div>
        <div className="role">{isSeller ? "판매자" : "구매자"}</div>
        <div className="commentContainer">
          <Star
            rate={review.point}
            freeze={true}
            id={`${postID+review.writer_id}`}
          />
          <div className="commentText">{review.content}</div>
        </div>
      </div>
    );
  else return null;
}
