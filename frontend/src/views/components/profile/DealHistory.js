import React from "react";
import HorizontalScroller from "../base/HorizontalScroller";
import SAHistory from "../rate/SAHistory";

export default function DealHistory({ user }) {
  const deals = [0];
  return (
    <div>
      <div className="section-header">{user.name}의 거래 발자취</div>
      {deals.map(deal => (
        <div className="historyContainer">
          <SAHistory user={user} chatRoomId={deal} />
        </div>
      ))}
    </div>
  );
}
