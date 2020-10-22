import React from "react";
import BackBtn from "views/components/header/BackBtn";
import { LieksNChats } from "views/components/header/TopLinks";
import UserProfile from "views/components/user/UserProfile";

export function ProfileHeader({ user, pageY, myId }) {
  return (
    <div>
      <div className="profileHeaderBar backdropBlur">
        <BackBtn loc={[12, 10]} fixed={true} />
        {myId === user.id && (
          <div className="myProfile">
            <LieksNChats />
          </div>
        )}
      </div>
      <div className={`profileHeader ${pageY >= 245 ? "goAHead" : ""}`}>
        <UserProfile userInfo={user} stop={true} />
      </div>
    </div>
  );
}
export function Scouter({ user, pageY }) {
  return (
    <div className="scouter">
      <div className="scouterText">강함 측정기</div>
      <div className="scouterImg" />
      <div className="strengthBase">{"/1000"}</div>
      {225 <= pageY && (
        <div className="fadeinEffect">
          <div className="scouterCircle" />
          <div className="scouterLine" />
          <div className="strength">{"875"}</div>
        </div>
      )}
    </div>
  );
}
