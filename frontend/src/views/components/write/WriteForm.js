/* Write Page 에서 사용하는 입력 폼 */
import React from "react";
import styled from "styled-components";
import { TypeSelector, ClrSelector } from "./WriteSelector";
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
  const submitPost = () => {
    // backend 에 요청을 날림
  };

  return (
    <form onSubmit={submitPost}>
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
      <textarea
        className="postTextWrite"
        placeholder="글 입력"
        value={info.contents.content}
        style={{
          height: 50 + 16 * (info.contents.content.match(/\n/g) || []).length
        }}
        onChange={e => updateInfo({ content: e.target.value })}
      />
      <button className="btn postSubmitBtn" type="submit" disabled={false}>
        강군로드에 게시하기
      </button>
    </form>
  );
}
