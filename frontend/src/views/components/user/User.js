/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import "./User.css";

export default function User({ userInfo, loc }) {
  // loc: {top, left}
  const user = {
    position: "relative",
    top: loc ? loc[0] : 15,
    left: loc ? loc[1] : 20,
    zIndex: 2
  };

  return (
    <div style={user}>
      <Profile userInfo={userInfo} size={35} />
      <Link to={`/profile/${userInfo.id}`} className="btn userName">
        @{userInfo.id}
      </Link>
    </div>
  );
}
