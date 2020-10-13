/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from "react";
import "./User.css";

export default function Profile({ userInfo, size }) {
  const { id } = userInfo;
  let profileImg;
  try {
    // 사용자 이미지가 있는지 확인
    profileImg = require("../../../imgs/users/" + id + ".png");
  } catch {
    //  없으면 기본 이미지로
    profileImg = require("../../../imgs/icons/user.svg");
  }
  const userImg = {
    backgroundImage: "url(" + profileImg + ")",
    backgroundSize: `${size}px ${size}px`,
    borderRadius: `${size/2}px`,
    width: `${size}px`,
    height: `${size}px`,
  };

  const switchUserPage = () => {
    /* user profile page 로 이동 */
  };

  return (
    <button className="userImg" style={userImg} onClick={switchUserPage} />
  );
}
