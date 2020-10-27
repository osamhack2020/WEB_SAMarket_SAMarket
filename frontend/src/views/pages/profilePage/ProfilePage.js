/* 유저의 상세 정보를 볼 수 있는 페이지
samarket.kr/profile/${userId} 로
userId 기준으로 profile 을 보여줌
*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "views/modules/common/fakeServer";
import { signOut } from "views/modules/sign/state";
import { NotFoundPage } from "../tempPages";
import {
  ProfileHeader,
  Scouter,
  FriendList,
  DealHistory,
  PostList
} from "views/components/profile/index";
import { getUserProfile } from "api";

export default function ProfilePage({ match }) {
  const [pageY, setPageY] = useState(0);
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserProfile(match.params.userId).then(response => {
      setUserProfile(response.data);
    });
  }, []);

  const myId = useSelector(state => state.sign.userInfo.id);

  const handleScroll = () => {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  };

  useEffect(() => {
    setShow(false); // at first enter
    window.scrollTo(0, 0);
  }, [userProfile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  if (!show && 225 <= pageY && pageY < 245) {
    setShow(true); // only once stop scroll
    window.scrollTo(0, 245); // 강함 측정 중, 스크롤 막음
    document.body.style.overflow = "hidden";
    setTimeout(() => (document.body.style.overflow = null), 2000);
  }
  if (userProfile.id) {
    return (
      <div className="ProfilePage">
        <div className="ProfileBack" />
        <ProfileHeader user={userProfile} pageY={pageY} myId={myId} />
        <div>
          <Scouter user={userProfile} pageY={pageY} />
          <FriendList user={userProfile} />
          <DealHistory user={userProfile} />
          <PostList user={userProfile} />
        </div>
        {myId === userProfile.id && <SignOut />}
      </div>
    );
  } else {
    return <div></div>;
  }
}

function SignOut() {
  const dispatch = useDispatch();
  const logOut = () => dispatch(signOut());
  return (
    <Link to="/" className="btn signOut" onClick={logOut}>
      로그아웃
    </Link>
  );
}
