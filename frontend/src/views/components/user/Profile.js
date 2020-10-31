/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./User.css";
import { customHistory } from "index";

const UserImgBack = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  ${props => props.loc
    ? `
postion: relative;
top: ${props => props.loc[0]}px;
left: ${props => props.loc[1]}px`
    : ""}
`;

export default function Profile({ userInfo, size, loc, disabled }) {
  // loc: {top, left}
  const { id } = userInfo;
  let profileImg = userInfo.profile_url;
  if (!profileImg || profileImg.length == 0) {
    profileImg = require("imgs/icons/user.svg");
  }
  const userImg = {
    backgroundImage: "url(" + profileImg + ")",
    backgroundSize: `${size}px ${size}px`,
    borderRadius: "50%",
    width: `${size}px`,
    height: `${size}px`
  };
  /*
    width: `${size}px`,
    height: `${size}px`
  };*/

  return (
    <UserImgBack size={size} loc={loc} onClick={() => { if (disabled != true) customHistory.push(`/profile/${userInfo.id}`) }} to={`/profile/${id}`} className="btn userImg">
      <div style={userImg} />
    </UserImgBack>
  );
}
