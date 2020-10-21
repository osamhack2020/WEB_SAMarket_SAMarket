import React, { useState, useEffect } from "react";
import BackBtn from "views/components/header/BackBtn";
import { LieksNChats } from "views/components/header/TopLinks";
import UserProfile from "views/components/user/UserProfile";

export function ProfileHeader({ user, pageY, myId }) {
  return (
    <div className={`profileHeader ${pageY >= 345 ? "goAHead" : ""}`}>
      <BackBtn loc={[12, 10]} fixed={true} />
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
  console.log(pageY);
  return (
    <div
      className={`scouter ${240 <= pageY && pageY <= 340 ? "stopProfile" : ""}`}
    >
      <div className="scouterText">강함 측정기</div>
      <div className="scouterImg" />
      <div className="strengthBase">{"/1000"}</div>
      {240 <= pageY && (
        <div className="fadeinEffect">
          <div className="scouterCircle" />
          <div className="scouterLine" />
          <div className="strength">{"875"}</div>
        </div>
      )}
    </div>
  );
}
