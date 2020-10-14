/* 현재 Login 한 사용자의 Profile 을 보여주는 Component */
import React from "react";
import { useDispatch } from "react-redux";
import Profile from "../user/Profile";
import Croucher from "../base/Croucher";
import { changeKeyword } from "../../../modules/search/state";
import userInfo from "../../../data/me.json";
import "./me.css";

export default function Me() {
  const { name, id, loc, org } = userInfo;
  const dispatch = useDispatch();
  const handleSearch = idx => {
    /* loc 클릭시 전체글, org 클릭시 해당 부대 글 */
    return () => dispatch(changeKeyword({ 0: "", 1: org }[idx]));
  };

  return (
    <div className="profile">
      <Profile userInfo={userInfo} size={80} />
      <div className="name">
        {name} @{id}
      </div>
      <Croucher norm={180} stretch="belong" crouched="belongOnly">
        <button className="loc" onClick={handleSearch(0)}>
          {loc}
        </button>
        <button className="org" onClick={handleSearch(1)}>
          {org}
        </button>
      </Croucher>
    </div>
  );
}
