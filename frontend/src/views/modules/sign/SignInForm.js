import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "./state";
import "./Sign.css";

export default function SignInForm() {
  const [userId, setId] = useState("");
  const [password, setPw] = useState("");
  const dipatch = useDispatch();

  const handleSignIn = e => {
    dipatch(signIn(userId, password));
    window.location.reload(); // 리로딩
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          className="signInput"
          type="id"
          placeholder="아이디"
          value={userId}
          onChange={e => setId(e.target.value)}
        />
        <input
          className="signInput"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPw(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? handleSignIn(e) : null)}
        />
        <button className="signBtn" type="submit">
          입장하기
        </button>
      </form>
      <div className="signQues">
        문제가 있나요?{" "}
        <Link to="/sign/findAccount" className="signFindLink">
          계정찾기
        </Link>
      </div>
    </div>
  );
}
