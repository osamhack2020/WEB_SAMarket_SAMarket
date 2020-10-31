import React, { useState, useEffect } from "react";
import HorizontalScroller from "../base/HorizontalScroller";
import SAHistory from "../rate/SAHistory";
import { getReviews } from "api";

export default function DealHistory({ user }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(user.id).then(response => {
      setReviews(response.data);
    });
  }, [user]);
  return (
    <div>
      <div className="section-header">{user.name}의 거래 발자취</div>
      {reviews.map(review => (
        <div className="historyContainer">
          <SAHistory key={review.post.id} review={review} user={user} />
        </div>
      ))}
      {reviews.length == 0 && (
        <div className="emptyFriend">거래내역이 아직 없어요</div>
      )}
    </div>
  );
}
