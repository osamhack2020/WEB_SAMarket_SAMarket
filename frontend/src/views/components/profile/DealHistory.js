import React from "react";
import HorizontalScroller from "../base/HorizontalScroller";
import SAHistory from "../rate/SAHistory";

export default function DealHistory({ user }) {
  const deals = [0];
  return (
    <HorizontalScroller target="dealHistory" delta={300} margin={0}>
      <div className="hScrlTitle">{user.name}의 거래 발자취</div>
      {deals.length === 0 && (
        <div className="historyContainer">
          <SAHistory user={user} chatRoomId={-1} />
        </div>
      )}
      {deals.map(deal => (
        <div className="historyContainer">
          <SAHistory user={user} chatRoomId={deal} />
        </div>
      ))}
    </HorizontalScroller>
  );
}
