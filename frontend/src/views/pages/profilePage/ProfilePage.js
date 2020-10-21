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
  FriendList
} from "views/components/profile/index";

export default function ProfilePage({ match }) {
  const [pageY, setPageY] = useState(0);
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

  if (!user) return <NotFoundPage />;
  return (
    <div
      className="ProfilePage"
      style={{
        marginTop: 245 <= pageY && pageY <= 345 ? pageY : pageY >= 345 ? 100 : 0
      }}
    >
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

function DealHistory({ user }) {
  return <div>거래내역</div>;
}

function PostList({ user }) {
  return <div>게시글 목록</div>;
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
