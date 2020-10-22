import React from "react";
import { getEmptyPost } from "views/modules/common/fakeServer";
import HorizontalScroller from "../base/HorizontalScroller";
import Post from "../post/Post";

export default function DealHistory({ user }) {
  const deals = [];
  return (
    <HorizontalScroller target="dealHistory" delta={300} margin={0}>
      <div className="hScrlTitle">{user.name}의 거래 발자취</div>
      {deals.length === 0 && (
        <div className="postContainer emptyPost">
          <Post info={getEmptyPost(user, "세상에!", "거래내역이 없습니다..")} />
        </div>
      )}
    </HorizontalScroller>
  );
}

function Deal({ dealId }) {
  const [seller, buyer] = [null, null];
  return <div></div>;
}
