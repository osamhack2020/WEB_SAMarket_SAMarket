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

export default function ProfilePage({ match }) {
  const [pageY, setPageY] = useState(0);
  const [show, setShow] = useState(false);
  const user = getUserById(match.params.userId);
  const myId = useSelector(state => state.sign.userId);

  const handleScroll = () => {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  if (!user) return <NotFoundPage />;
  return (
    <div className="ProfilePage">
      <div className="ProfileBack" />
      <ProfileHeader user={user} pageY={pageY} myId={myId} />
      <div>
        <Scouter user={user} pageY={pageY} />
        <FriendList user={user} />
        <DealHistory user={user} />
        <PostList user={user} />
      </div>
      {myId === user.id && <SignOut />}
    </div>
  );
}

function SignOut() {
  const dispatch = useDispatch();
  const logOut = () => dispatch(signOut());
  return (
    <Link to="/" className="btn signOut" onClick={logOut}>
      퇴장하기
    </Link>
  );
}
