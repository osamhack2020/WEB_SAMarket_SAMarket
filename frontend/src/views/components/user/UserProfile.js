/* 특정 사용자의 Profile 을 보여주는 Component */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../user/Profile";
import Croucher from "../base/Croucher";
import { changeKeyword } from "views/modules/search/state";
import "./User.css";

export default function UserProfile({ userInfo }) {
  const dispatch = useDispatch();
  const handleSearch = idx => {
    /* loc 클릭시 전체글, org 클릭시 해당 부대 글 */
    return () => dispatch(changeKeyword({ 0: "", 1: userInfo.org }[idx]));
  };
  console.log(useSelector(state => state));
  return (
    <div className="profile">
      <Profile userInfo={userInfo} size={80} />
      <div className="name">
        {userInfo.name} @{userInfo.id}{" "}
      </div>
      <Croucher norm={177} stretch="belong" crouched="belongOnly">
        <Link to="/" className="btn loc" onClick={handleSearch(0)}>
          {userInfo.loc}
        </Link>
        <Link to="/" className="btn org" onClick={handleSearch(1)}>
          {userInfo.org}
        </Link>
      </Croucher>
    </div>
  );
}
