/* 특정 사용자의 Profile 을 보여주는 Component */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Profile from "../user/Profile";
import Croucher from "../base/Croucher";
import { changeKeyword } from "views/modules/search/state";
import "./User.css";

export default function UserProfile({ userInfo, stop }) {
  const dispatch = useDispatch();
  const handleSearch = idx => {
    /* loc 클릭시 전체글, org 클릭시 해당 부대 글 */
    return () => dispatch(changeKeyword({ 0: "", 1: userInfo.org }[idx]));
  };

  return (
    <div className="profile">
      <Profile userInfo={userInfo} size={80} />
      <div className="name">
        {userInfo.name} @{userInfo.login_id}{" "}
      </div>
      {stop ? ( // scroll 에 반응하지 않음
        <Belongs userInfo={userInfo} handleSearch={handleSearch} />
      ) : (
        <Croucher norm={177} stretch="belong" crouched="belongOnly">
          <Belongs userInfo={userInfo} handleSearch={handleSearch} />
        </Croucher>
      )}
    </div>
  );
}

function Belongs({ userInfo, handleSearch }) {
  return (
    <div className="belong">
      <Link to="/" className="btn loc" onClick={handleSearch(0)}>
        {["육군", "해군", "공군", "해병", "국직"][userInfo.unit.mil-1]}
      </Link>
      <Link to="/" className="btn org" onClick={handleSearch(1)}>
        {userInfo.unit.name}
      </Link>
    </div>
  );
}
