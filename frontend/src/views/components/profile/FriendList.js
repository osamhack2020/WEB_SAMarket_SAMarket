import React from "react";
import Profile from "../user/Profile";
import HorizontalScroller from "views/components/base/HorizontalScroller";

export default function FriendList({ user }) {
  const friends = [
    { id: "a0", name: "가나다" },
    { id: "a1", name: "라마바" },
    { id: "a2", name: "사아자" },
    { id: "a3", name: "차카타" },
    { id: "a4", name: "파하가" },
    { id: "a5", name: "나다라" },
    { id: "a6", name: "마바사" },
    { id: "a7", name: "아자차" },
    { id: "a8", name: "카타파" },
    { id: "a9", name: "하가나" }
  ];

  return (
    <HorizontalScroller target="friendScroll" delta={50}>
      <div className="hScrlTitle">{user.name}의 전우들</div>
      {friends.map(friend => (
        <Friend userInfo={friend} />
      ))}
      {friends.length === 0 && (
        <div className="emptyFriend">아직 전우가 없어요</div>
      )}
    </HorizontalScroller>
  );
}

function Friend({ userInfo }) {
  return (
    <div className="Friend">
      <Profile userInfo={userInfo} size={50} />
      <div className="friendName">{userInfo.name}</div>
    </div>
  );
}
