/* Sign In 페이지, 가입한 계정을 이용해 로그인 */
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import SignInForm from "views/modules/sign/SignInForm";
import AboutUs from "views/components/aboutUs/AboutUs";

export default function SignInPage() {
  if (!useSelector(state => state.sign.authToken)) {
    const SignUpEntry = styled.div`
      font-size: 14px;
      margin: 30px 0 10px 0;
    `;

    return (
      <div>
        <div className="signBack" />
        <div className="signPage">
          <div className="signLogo" />
          <h1 className="signTitle">강군마켓</h1>
          <h2 className="sginSub">강한군인들의 중고거래 커뮤니티</h2>
          <SignInForm />
          <div className="signSpliter" />
          <SignUpEntry>
            아직 강군마켓의 일원이 아닌가요?
            <Link to="signup">
              <button className="signUpBtn">강한군인으로 등록하기</button>
            </Link>
          </SignUpEntry>
          <AboutUs heightNorm={700} />
        </div>
      </div>
    );
  }
  return <Redirect to="/" />;
}
