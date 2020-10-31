import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "./state";
import styled from "styled-components";
import "./Sign.css";
import { useForm, Controller } from "react-hook-form";
import { getUnitList } from "api";

const InputTitle = styled.div`
  margin-top: 20px;
  font-size: 13px;
  color: #05b0ea;
  position: relative;
  left: 55px;
  text-align: left;
`;

export default function SignUpForm() {
  const { register, setValue, errors, control, watch, handleSubmit } = useForm();

  const [userInfo, setInfo] = useState();
  const [unitList, setUnitList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getUnitList().then(response => {
      setUnitList(response.data);
    });
  }, []);

  let pwd = watch("password");
  let pwd_cnf = watch("password_cnf");
  let mil = watch("mil");

  const handleSignUp = data => {
    if (pwd == pwd_cnf) {
      data.mil = Number(data.mil);
      data.unit_id = Number(data.unit_id);
      data.rank = Number(data.rank);
      dispatch(signUp(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <InputTitle>ID & PW</InputTitle>
      <input
        className="signInput"
        type="id"
        placeholder="아이디"
        required
        name="login_id" ref={register}
      />
      <input
        className="signInput"
        type="password"
        placeholder="비밀번호"
        required
        name="password" ref={register}
      />
      <input
        className={`signInput ${
          pwd_cnf && pwd !== pwd_cnf ? "WARN" : ""
        }`}
        type="password"
        placeholder="비밀번호 확인"
        required
        name="password_cnf" ref={register}
      />
      {pwd_cnf && pwd !== pwd_cnf && (
        <div className="warnMsg">비밀번호가 일치하지 않습니다.</div>
      )}
      <InputTitle>이름</InputTitle>
      <input
        className="signInput"
        placeholder="이름"
        required
        name="name" ref={register}
      />
      <InputTitle>소속</InputTitle>
      <select
        className="signInput comboBox"
        placeholder="군별"
        required
        onChange={e => setInfo({ loc: e.target.value, ...userInfo })}
        name="mil" ref={register}
      >
        {[
          [1, "육군"],
          [2, "해군"],
          [3, "공군"],
          [4, "해병"],
          [5, "국직"]
        ].map(unitType => (
          <option value={unitType[0]}>{unitType[1]}</option>
        ))}
      </select>
      <select
        className="signInput comboBox"
        placeholder="부대"
        required
        onChange={e => setInfo({ unit_id: e.target.value, ...userInfo })}
        name="unit_id" ref={register}
      >
        {unitList.filter(unit => unit.mil == Number(mil)).map(unit => (
          <option value={unit.id}>{unit.name}</option>
        ))}
      </select>

      <select
        className="signInput comboBox"
        placeholder="현재 계급"
        required
        onChange={e => setInfo({ rank: e.target.value, ...userInfo })}
        name="rank" ref={register}
      >
        {[
          [0, "이등병"],
          [1, "일등병"],
          [2, "상등병"],
          [3, "병장"]
        ].map(rank => (
          <option value={rank[0]}>{rank[1]}</option>
        ))}
      </select>
      <InputTitle>군 복무</InputTitle>
      <input
        className="signInputDate"
        placeholder="입대일"
        type="date"
        value="2020-01-01"
        required
        aria-required="true"
        name="ipdae" ref={register}
      />
      <div>~</div>
      <input
        className="signInputDate"
        placeholder="전역일"
        type="date"
        value="2021-01-01"
        required
        aria-required="true"
        name="jeonyeok" ref={register}
      />
      <button style={{ marginTop: 40 }} className="btn signBtn" type="submit">
        등록하기
      </button>
    </form>
  );
}
