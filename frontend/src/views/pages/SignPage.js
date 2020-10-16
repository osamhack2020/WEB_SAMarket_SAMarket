import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignInForm from "../modules/sign/SignInForm";

export default function SignPage() {
  if (useSelector(state => state.sign.authToken)) {
    return <Redirect to="/" />;
  }
  return (
    <div className="signBack">
      <div className="signLogo" />
      <h1 className="signTitle">강군마켓</h1>
      <h2 className="sginSub">강한군인들의 중고거래 커뮤니티</h2>
      <SignInForm />
    </div>
  );
}
