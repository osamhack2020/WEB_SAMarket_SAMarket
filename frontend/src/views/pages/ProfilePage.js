/* 게시물의 상세 정보를 볼 수 있는 페이지
samarket.kr/posts/${postId 로
postId를 기준으로 post 를 보여줌
postId가 없는 경우, 메인화면으로
*/
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserById } from "views/modules/common/fakeServer";
import { signOut } from "../modules/sign/state";
import UserProfile from "views/components/user/UserProfile";
import "./Pages.css";
import BackBtn from "views/components/header/BackBtn";

export default function ProfilePage({ match }) {
  const myId = useSelector(state => state.sign.userId);
  const user = getUserById(match.params.userId);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(signOut());
  };
  return (
    <div className="ProfilePage">
      <BackBtn />
      <UserProfile userInfo={user} />
      {myId === user.id && (
        <Link to="/" onClick={logOut}>
          로그아웃
        </Link>
      )}
    </div>
  );
}
