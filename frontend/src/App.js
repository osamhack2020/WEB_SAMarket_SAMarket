/* Index 에서 가장 먼저 호출하는 Component
사용자 로그인 여부 등을 파악하고, 주소에 따라 화면을 전환함
*/
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import LikesPage from "./pages/LikesPage";
import ChatsPage from "./pages/ChatsPage";
import WritePage from "./pages/WritePage";

export default function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={MainPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/likes" component={LikesPage} />
      <Route path="/chats" component={ChatsPage} />
      <Route path="/write" component={WritePage} />
    </BrowserRouter>
  );
}
