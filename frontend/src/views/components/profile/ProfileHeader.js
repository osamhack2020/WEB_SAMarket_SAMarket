import React, { useState, useEffect } from "react";
import BackBtn from "views/components/header/BackBtn";
import { LieksNChats } from "views/components/header/TopLinks";
import UserProfile from "views/components/user/UserProfile";

export function ProfileHeader({ user, pageY, myId }) {
  return (
    <div className={`profileHeader ${pageY >= 345 ? "goAHead" : ""}`}>
      <BackBtn fixed={true} />
      <UserProfile userInfo={user} stop={true} />
      {myId === user.id && (
        <div className="myProfile">
          <LieksNChats />
        </div>
      )}
    </div>
  );
}

export function Scouter({ user, pageY }) {
  return (
    <div
      className={`scouter ${245 <= pageY && pageY <= 345 ? "stopProfile" : ""}`}
    >
      <div className="scouterCircle" />
      <div className="scouterText">강함 측정기</div>
      <div className="strengthBase">{"/1000"}</div>
      {245 <= pageY && pageY <= 345 && (
        <div className="fadeinEffect">
          <div className="scouterImg" />
          <div className="strength">{"875"}</div>
        </div>
      )}
    </div>
  );
}
