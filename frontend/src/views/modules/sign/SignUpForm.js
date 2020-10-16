import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "./state";
import "./Sign.css";

export default function SignUpForm() {
  const [userId, setId] = useState("tae7130");
  const [userInfo, setInfo] = useState({
    name: "장태순",
    id: "tae7130",
    pw: "4284",
    loc: "국방부",
    org: "4284부대",
    likes: [1, 3]
  });
  const dipatch = useDispatch();

  const handleSignUp = _ => {
    dipatch(signUp(userId, userInfo));
  };

  return (
    <form onSubmit={handleSignUp}>
      <button className="signBtn" type="submit">
        등록하기
      </button>
    </form>
  );
}
