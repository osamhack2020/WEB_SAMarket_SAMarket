/* Main 페이지, 로그인 시에는 강군로드로 게시글을 보여주고,
  로그인이 안된 경우, 로그인 페이지로 Redirect 시킨다.
*/
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../components/header/Header";
import MenuBar from "../components/menubar/MenuBar";
import SAMroad from "../modules/samroad/SAMroad";
import "./Pages.css";

export default function MainPage() {
  const authToken = useSelector(state => state.sign.authToken);
  if (authToken) {
    return (
      <div className="MainPage">
        <Header />
        <SAMroad />
        <MenuBar />
      </div>
    );
  }
  return <Redirect to="/sign" />;
}
