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
import { customHistory } from "index";
import animateScrollTo from "animated-scroll-to";

export default function ProfilePage({ match }) {
  const [pageY, setPageY] = useState(0);
  const [show, setShow] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserProfile(match.params.userId).then(response => {
      setUserProfile(response.data);
    });
  }, [match]);

  const myId = useSelector(state => state.sign.userInfo.id);

  const handleScroll = () => {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  };

  useEffect(() => {
    if (customHistory.action == "PUSH") {
      setShow(false); // at first enter
      window.scrollTo(0, 0);
    }
  }, [userProfile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  if (!show && customHistory.action == "PUSH") {
    setShow(true); // only once stop scroll
    animateScrollTo(245, {
      elementToScroll: window,
      horizontalOffset: 0,
      maxDuration: 1500,
      minDuration: 1500,
      speed: 500,
      verticalOffset: 0,
      cancelOnUserAction: false
    });
    document.body.style.overflow = "hidden";
    setTimeout(() => (document.body.style.overflow = null), 2000);
  }
  if (userProfile.user) {
    return (
      <div className="ProfilePage">
        <div className="ProfileBack" />
        <ProfileHeader
          user={userProfile.user}
          isFriend={userProfile.is_friend}
          pageY={pageY}
          myId={myId}
        />
        <div style={{ minHeight: "100vh" }}>
          <Scouter score={Math.round(userProfile.score)} pageY={pageY} />
          <FriendList user={userProfile.user} />
          <DealHistory user={userProfile.user} />
          <PostList user={userProfile.user} />
        </div>
        {myId === userProfile.user.id && <SignOut />}
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
