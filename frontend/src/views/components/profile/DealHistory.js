import React from "react";
import HorizontalScroller from "../base/HorizontalScroller";

export default function DealHistory({ user }) {
  return (
    <HorizontalScroller target="dealHistory" delta={300}>
      <div className="hScrlTitle?">{user.name}의 거래 발자취</div>
    </HorizontalScroller>
  );
}
