import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInReq } from "api";
import { login } from "./state";
import "./Sign.css";

export default function SignInForm() {
  const [userId, setId] = useState("");
  const [password, setPw] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = async(e) => {
    e.preventDefault();
    dispatch(login(userId, password));
  };

  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          className="signInput"
          type="id"
          placeholder="아이디"
          value={userId}
          required="true"
          onChange={e => setId(e.target.value)}
        />
        <input
          className="signInput"
          type="password"
          placeholder="비밀번호"
          value={password}
          required="true"
          onChange={e => setPw(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? handleSignIn(e) : null)}
        />
        <button className="btn signBtn" type="submit">
          입장하기
        </button>
      </form>
      {/*<div className="signQues">
        문제가 있나요?{" "}
        <Link to="/sign/findAccount" className="btn signFindLink">
          계정찾기
        </Link>
      </div>*/}
    </div>
  );
}
