import React from "react";
import Profile from "../user/Profile";
import "./FriendList.css";

export default function FriendList({ user }) {
  const scrollX = delta_x =>
    (document.getElementById("friendScroll").scrollLeft += delta_x);

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
    <div class="FriendList">
      <div className="friendsWrapper" id="friendScroll">
        <div className="friendsTitle">친구목록</div>
        {friends.map(friend => (
          <Friend userInfo={friend} />
        ))}
      </div>
      <button className="btn scrlLeft" onClick={() => scrollX(50)} />
      <button className="btn scrlRight" onClick={() => scrollX(-50)} />
    </div>
  );
}

function Friend({ userInfo }) {
  return (
    <div className="Friend">
      <Profile userInfo={userInfo} size={60} />
      <div>{userInfo.name}</div>
    </div>
  );
}
