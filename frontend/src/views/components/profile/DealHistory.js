import React from "react";
import HorizontalScroller from "../base/HorizontalScroller";

export default function DealHistory({ user }) {
  return (
    <HorizontalScroller target="dealHistory" delta={300}>
      <div className="hScrlTitle?">{user.name}의 강함의 역사</div>
    </HorizontalScroller>
  );
}
