/* Index 에서 가장 먼저 호출하는 Component
사용자 로그인 여부 등을 파악하고, 주소에 따라 화면을 전환함
*/
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import SignInPage from "./SignInPage";
import LikesPage from "./LikesPage";
import ChattingPage from "./ChattingPage";
import ChatsPage from "./ChatsPage";
import WritePage from "./WritePage";
import PostPage from "./PostPage";
import ProfilePage from "./ProfilePage";
import NotFoundPage from "./NotFoundPage";
import View from "../modules/api/example";

export default function Pages() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/likes" component={LikesPage} />
        <Route path="/chat" component={ChattingPage} />
        <Route path="/chats" component={ChatsPage} />
        <Route path="/write" component={WritePage} />
        <Route path="/posts/:postId" component={PostPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/view" component={View} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
