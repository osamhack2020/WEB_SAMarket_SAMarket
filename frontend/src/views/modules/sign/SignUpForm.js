import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "./state";
import styled from "styled-components";
import "./Sign.css";

const InputTitle = styled.div`
  margin-top: 20px;
  font-size: 13px;
  color: #05b0ea;
  position: relative;
  left: 55px;
  text-align: left;
`;

export default function SignUpForm() {
  const [userId, setId] = useState("");
  const [password, setPw] = useState("");
  const [password_cnf, setPwCnf] = useState("");
  const [userInfo, setInfo] = useState();
  const dipatch = useDispatch();

  const handleSignUp = _ => {
    throw new Error("가입 기능 구현중..");
    dipatch(signUp(userId, { userId, password, ...userInfo }));
  };

  const checkPwValidate = e => {
    // 비밀번호의 유효성을 여기서 검증
    setPw(e.target.value);
  };

  return (
    <form onSubmit={handleSignUp}>
      <InputTitle>ID & PW</InputTitle>
      <input
        className="signInput"
        type="id"
        placeholder="아이디"
        required="true"
        onChange={e => setId(e.target.value)}
      />
      <input
        className="signInput"
        type="password"
        placeholder="비밀번호"
        required="true"
        onChange={checkPwValidate}
      />
      <input
        className={`signInput ${
          password_cnf && password !== password_cnf ? "WARN" : ""
        }`}
        type="password"
        placeholder="비밀번호 확인"
        required="true"
        onChange={e => setPwCnf(e.target.value)}
      />
      {password_cnf && password !== password_cnf && (
        <div className="warnMsg">비밀번호가 일치하지 않습니다.</div>
      )}

      <InputTitle>소속</InputTitle>
      <select
        className="signInput comboBox"
        placeholder="군별"
        required="true"
        onChange={e => setInfo({ loc: e.target.value, ...userInfo })}
      >
        {[
          ["army", "육군"],
          ["navy", "해군"],
          ["airForce", "공군"],
          ["marin", "해병"],
          ["mnd", "국직"]
        ].map(mil => (
          <option value={mil[0]}>{mil[1]}</option>
        ))}
      </select>
      <input
        className="signInput"
        placeholder="부대"
        required="true"
        onChange={e => setInfo({ org: e.target.value, ...userInfo })}
      />

      <InputTitle>군 복무</InputTitle>
      <input
        className="signInput"
        placeholder="계급"
        required="true"
        onChange={e => setInfo({ rank: e.target.value, ...userInfo })}
      />
      <input
        className="signInputDate"
        placeholder="입대일"
        type="date"
        required
        aria-required="true"
        onChange={e => setInfo({ enter: e.target.value, ...userInfo })}
      />
      <input
        className="signInputDate"
        placeholder="전역일"
        type="date"
        required
        aria-required="true"
        onChange={e => setInfo({ discharge: e.target.value, ...userInfo })}
      />
      <button style={{ marginTop: 40 }} className="btn signBtn" type="submit">
        등록하기
      </button>
    </form>
  );
}
