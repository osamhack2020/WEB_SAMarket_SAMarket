/* Sign In 페이지, 가입한 계정을 이용해 로그인 */
import React from "react";
import BackBtn from "views/components/header/BackBtn";
import AboutUs from "views/components/aboutUs/AboutUs";
import SignUpForm from "views/modules/sign/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="signBack">
      <BackBtn />
      <div className="signLogo" />
      <h1 className="signTitle">강군마켓</h1>
      <h2 className="sginSub">강한군인들의 중고거래 커뮤니티</h2>
      <SignUpForm />
      <AboutUs />
    </div>
  );
}
