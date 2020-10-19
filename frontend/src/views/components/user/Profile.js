/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./User.css";

export default function Profile({ userInfo, size, loc }) {
  // loc: {top, left}
  const { id } = userInfo;
  let profileImg;
  try {
    // 사용자 이미지가 있는지 확인
    profileImg = require(`imgs/users/${id}.png`);
  } catch {
    //  없으면 기본 이미지로
    profileImg = require("imgs/icons/user.svg");
  }
  const userImg = {
    backgroundImage: "url(" + profileImg + ")",
    backgroundSize: `${size}px ${size}px`,
    borderRadius: "50%",
    width: `${size}px`,
    height: `${size}px`
  };

  const UserImgBack = styled(Link)`
    width: ${size}px;
    height: ${size}px;
    ${loc
      ? `
    postion: relative;
    top: ${loc[0]}px;
    left: ${loc[1]}px`
      : ""}
  `;
  /*
    width: `${size}px`,
    height: `${size}px`
  };*/

  return (
    <UserImgBack to={`/profile/${id}`} className="btn userImg">
      <div style={userImg} />
    </UserImgBack>
  );
}
