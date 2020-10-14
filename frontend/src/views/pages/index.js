/* Index 에서 가장 먼저 호출하는 Component
사용자 로그인 여부 등을 파악하고, 주소에 따라 화면을 전환함
*/
import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import MainPage from "./MainPage";
import SignInPage from "./SignInPage";
import LikesPage from "./LikesPage";
import ChatsPage from "./ChatsPage";
import WritePage from "./WritePage";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";

export default function Pages() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={MainPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/likes" component={LikesPage} />
      <Route path="/chats" component={ChatsPage} />
      <Route path="/write" component={WritePage} />
      <Route path="/posts" component={PostPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route render={() => <div>없는 페이지 입니다.</div>} />
    </BrowserRouter>
  );
}
