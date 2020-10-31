import React, { useState, createRef } from "react";
import BackBtn from "views/components/header/BackBtn";
import UserProfile from "views/components/user/UserProfile";
import { uploadImage, follow, unfollow } from "api";

export function ProfileHeader({ user, isFriend: f, pageY, myId }) {
  const [isFriend, setFriend] = useState(f);
  const changeImg = e => {
    // change the img;
    uploadRef.current.click();
  };

  const toggleFollow = e => {
    if (isFriend) {
      unfollow(user.id).then(response => {
        setFriend(false);
      });
    } else {
      follow(user.id).then(response => {
        setFriend(true);
      });
    }
  };

  const handleFileInput = e => {
    var formData = new FormData();
    formData.append("file", uploadRef.current.files[0]);
    console.log(formData);
    uploadImage(formData).then(response => {
      window.location.reload();
    });
  };
  const uploadRef = createRef();

  return (
    <div>
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
      <div className="profileHeaderBar">
        <BackBtn loc={[12, 10]} fixed={true} />
      </div>
      <div className={`profileHeader ${pageY >= 245 ? "goAHead" : ""}`}>
        <UserProfile userInfo={user} stop={true} />
      </div>
      <input
        ref={uploadRef}
        type="file"
        name="file"
        onChange={e => handleFileInput(e)}
        hidden
      />
    </div>
  );
}

export function Scouter({ score, pageY }) {
  return (
    <div className="scouter">
      <div className="scouterText">강함 측정기</div>
      <div className="scouterImg" />
      <div className="strengthBase">{"/1000"}</div>
      {225 <= pageY && (
        <div className="fadeinEffect">
          <div className="scouterCircle" />
          <div className="scouterLine" />
          <div className="strength">{score}</div>
        </div>
      )}
    </div>
  );
}
