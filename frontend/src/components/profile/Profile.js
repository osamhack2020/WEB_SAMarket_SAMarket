/* 현재 Login 한 사용자의 Profile 을 보여주는 Component */
import React from "react";
import Croucher from "../base/Croucher";
import UserInfo from "../../data/user/profile.json";
import "./Profile.css";

export default function Profile({ onSearch }) {
  const { name, id, loc, org } = UserInfo;
  const handleSearch = idx => {
    /* loc 클릭시 전체글, org 클릭시 해당 부대 글 */
    return () => onSearch({ keyword: { 0: "", 1: org }[idx] });
  };

  const switchProfilePage = () => {
    /* 현재 사용자 Profile 화면으로 전환 */
  };

  return (
    <div className="profile">
      <button className="profileImg" onClick={switchProfilePage} />
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
