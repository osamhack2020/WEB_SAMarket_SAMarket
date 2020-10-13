/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from "react";
import Profile from "./Profile";
import "./User.css";

export default function User({ userInfo, loc }) {
  const user = {
    position: "relative",
    top: loc ? loc[0] : 15,
    left: loc ? loc[1] : 20
  };
  return (
    <div style={user}>
      <Profile userInfo={userInfo} size={35} />
      <button
        className="userName" //TODO: onClick={switchUserPage}
      >
        @{userInfo.id}
      </button>
    </div>
  );
}
