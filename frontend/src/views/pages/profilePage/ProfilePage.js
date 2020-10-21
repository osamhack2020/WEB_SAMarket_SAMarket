/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "views/modules/common/fakeServer";
import { signOut } from "views/modules/sign/state";
import BackBtn from "views/components/header/BackBtn";
import { LieksNChats } from "views/components/header/TopLinks";
import UserProfile from "views/components/user/UserProfile";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return (
    <div className="ProfilePage">
      <div className="ProfileBack" />
      <ProfileHeader user={user} pageY={pageY} myId={myId} />
      <Scouter user={user} pageY={pageY} />
      <div classNam={pageY >= 0 ? "goProfile" : "stopProfile"}>
        <FriendList user={user} />
        <DealHistory user={user} />
        <PostList user={user} />
      </div>
      {myId === user.id && <SignOut />}
    </div>
  );
}

function ProfileHeader({ user, pageY, myId }) {
  return (
    <div>
      <BackBtn />
      <UserProfile userInfo={user} stop={true} />
      {myId === user.id && (
        <div className="myProfile">
          <LieksNChats />
        </div>
      )}
    </div>
  );
}

function Scouter({ user, pageY }) {
  return <div>스카우터</div>;
}

function FriendList({ user }) {
  return <div>친구목록</div>;
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
