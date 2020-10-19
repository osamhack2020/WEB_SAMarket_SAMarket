/* 현재 Login 한 사용자의 Profile 을 보여주는 Component */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Profile from "../user/Profile";
import Croucher from "../base/Croucher";
import { changeKeyword } from "views/modules/search/state";
import "./me.css";

export default function Me() {
  const userInfo = useSelector(state => state.sign.userInfo);
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
      <Croucher norm={180} stretch="belong" crouched="belongOnly">
        <button className="btn loc" onClick={handleSearch(0)}>
          {userInfo.loc}
        </button>
        <button className="btn org" onClick={handleSearch(1)}>
          {userInfo.org}
        </button>
      </Croucher>
    </div>
  );
}
