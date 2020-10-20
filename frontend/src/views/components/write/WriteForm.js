/* Write Page 에서 사용하는 입력 폼 */
import React, { useState } from "react";
import styled from "styled-components";
import TypeSelector from "./TypeSelector";
import TagInput from "./TagInput";
import "./Write.css";

const InputTitle = styled.div`
  position: relative;
  right: 40px;
  margin-top: 20px;
  font-size: 14px;
  color: #05b0ea;
  text-align: right;
`;

export default function WriteForm({ info, updateInfo }) {
  return (
    <form>
      <InputTitle style={{ marginTop: 35 }}>포스팅 간판</InputTitle>
      <TypeSelector info={info} updateInfo={updateInfo} />
      <input
        placeholder={"*포스팅 제목"}
        value={info.contents.title}
        onChange={e => updateInfo({ title: e.target.value })}
        className={`postInput ${
          info.contents.title === undefined || info.contents.title ? "" : "WARN"
        }`}
      />
      <input
        placeholder={info.type === "sell" ? "*가격" : "*한 줄 요약"}
        type={info.type === "sell" ? "number" : "text"}
        value={info.contents.sub}
        onChange={e => updateInfo({ sub: e.target.value })}
        className={`postInput ${
          info.contents.sub === undefined || info.contents.sub ? "" : "WARN"
        }`}
      />
      <InputTitle># 태그</InputTitle>
      <TagInput info={info} updateInfo={updateInfo} />
      <InputTitle>색상 설정</InputTitle>
      <ClrSelector info={info} updateInfo={updateInfo} />
      <InputTitle>내용</InputTitle>
      <div>줄 바꿈 가능한 글로 입력가능하도록</div>
      <button className="btn postSubmitBtn" type="submit" disabled={true}>
        강군로드에 게시하기
      </button>
    </form>
  );
}

function ClrSelector({ info, updateInfo }) {
  const clrs = ["back", "tag", "font"];
  const selectClr = e => {
    console.log(e.target.name, e.target.value);
    updateInfo({ [e.target.name + "Clr"]: e.target.value });
  };
  return (
    <div className="clrSelector">
      {clrs.map((clr, idx) => (
        <div className="clrContainer">
          {["배경", "태그", "글씨"][idx]}
          <input
            className="btn clrInput"
            type="color"
            value={info.contents.clr[clr]}
            onChange={selectClr}
            name={clr}
          />
        </div>
      ))}
    </div>
  );
}
