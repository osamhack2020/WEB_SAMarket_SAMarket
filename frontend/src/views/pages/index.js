/* Index 에서 가장 먼저 호출하는 Component
사용자 로그인 여부 등을 파악하고, 주소에 따라 화면을 전환함
*/
import React from "react";
import { useDispatch, connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import { InDevPage, NotFoundPage } from "./tempPages/index";
import { SignInPage, SignUpPage } from "./signPages/index";
import { PostPage, WritePage } from "./postPages/index";
import { ChatsPage, ChattingPage } from "./chatPages/index";
import { ProfilePage } from "./profilePage/index";
import LikesPage from "./LikesPage";
import { Router } from "react-router-dom";
import { checkSess } from "views/modules/sign/state";

function AuthFilterImpl(props) {
  if (props.invalid) {
    props.history.replace("/sign");
  }
  if (props.userInfo)
    return <div>{props.children}</div>;
  else
    return <div>{props.invalid}</div>
}

const AuthFilter = connect(
  state => ({userInfo: state.sign.userInfo, invalid: state.sign.invalid })
) (AuthFilterImpl);

function Pages({ history }) {
  const dispatch = useDispatch();
  dispatch(checkSess());

  return (
    <Router history={history}>
      <Switch>
        <Route path="/sign/findAccount" component={InDevPage} />
        <Route path="/sign" component={SignInPage} />
        <Route path="/signup" component={SignUpPage} />
        <AuthFilter history={history}>
          <Route exact path="/" component={MainPage} />
          <Route path="/aboutus/:what" component={InDevPage} />
          <Route path="/likes" component={LikesPage} />
          <Route path="/chat/:chatRoomId" component={ChattingPage} />
          <Route path="/chats" component={ChatsPage} />
          <Route path="/write" component={WritePage} />
          <Route path="/posts/:postId" component={PostPage} />
          <Route path="/profile/:userId" component={ProfilePage} />
        </AuthFilter>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default Pages;