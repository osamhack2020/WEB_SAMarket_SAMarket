/* Index 에서 가장 먼저 호출하는 Component
사용자 로그인 여부 등을 파악하고, 주소에 따라 화면을 전환함
*/
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import { InDevPage, NotFoundPage } from "./tempPages/index";
import { SignInPage, SignUpPage } from "./signPages/index";
import { PostPage, WritePage } from "./postPages/index";
import { ChatsPage, ChattingPage } from "./chatPages/index";
import { ProfilePage } from "./profilePage/index";
import LikesPage from "./LikesPage";

export default function Pages() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/sign/findAccount" component={InDevPage} />
        <Route path="/sign" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/aboutus/:what" component={InDevPage} />
        <Route path="/likes" component={LikesPage} />
        <Route path="/chat/:chatRoomId" component={ChattingPage} />
        <Route path="/chats" component={ChatsPage} />
        <Route path="/write" component={WritePage} />
        <Route path="/posts/:postId" component={PostPage} />
        <Route path="/profile/:userId" component={ProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
