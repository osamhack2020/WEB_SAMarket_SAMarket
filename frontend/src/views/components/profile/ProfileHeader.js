import React, { useState } from "react";
import BackBtn from "views/components/header/BackBtn";
import UserProfile from "views/components/user/UserProfile";

export function ProfileHeader({ user, pageY, myId }) {
  const [isFriend, setFriend] = useState(false);
  const changeImg = e => {
    // change the img;
  };

  const toggleFollow = e => {
    // follow / unfollow friend
    setFriend(!isFriend);
  };

  return (
    <div>
      <div className="profileHeaderBar backdropBlur">
        <BackBtn loc={[12, 10]} fixed={true} />

        <div className="profileTopBtn">
          {myId === user.id ? (
            <button className="btn changeImg" onClick={changeImg}>
              사진 교체
            </button>
          ) : (
            <button
              className={`btn follow${isFriend ? "ed" : ""}`}
              onClick={toggleFollow}
            >
              {isFriend ? "전우 끊기" : "전우 맺기"}
            </button>
          )}
        </div>
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
