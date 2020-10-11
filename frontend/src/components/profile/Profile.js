import React, { useState, useEffect, useRef } from "react";
import UserInfo from "../../data/user/profile.json";
import "./Profile.css";

const Profile = ({ onSearch }) => {
  const { name, id, loc, org } = UserInfo;
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);
  const handleScroll = () => {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  };
  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

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
      <div className={pageY <= 180 ? "belong" : "belongOnly"}>
        <button className="loc" onClick={handleSearch(0)}>
          {loc}
        </button>
        <button className="org" onClick={handleSearch(1)}>
          {org}
        </button>
      </div>
    </div>
  );
};

export default Profile;
