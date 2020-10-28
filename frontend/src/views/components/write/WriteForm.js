/* Write Page 에서 사용하는 입력 폼 */
import React from "react";
import styled from "styled-components";
import { TypeSelector, ClrSelector } from "./WriteSelector";
import TagInput from "./TagInput";
import "./Write.css";
import { addPost, setPostUpdated } from "api";

const InputTitle = styled.div`
  position: relative;
  right: 40px;
  margin-top: 20px;
  font-size: 14px;
  color: #05b0ea;
  text-align: right;
`;

export default function WriteForm({ info, updateInfo }) {
  const submitPost = e => {
    // backend 에 요청 날림
    e.preventDefault();
    addPost(info).then(response => {
      if (response.status == 200) {
        setPostUpdated(true);
        window.history.go(-1);
      }
    });
  };

  return (
    <form
      onSubmit={submitPost}
      onKeyPress={event => {
        if (event.which === 13 && event.target.tagName != "TEXTAREA") {
          event.preventDefault();
        }
      }}
    >
      <InputTitle style={{ marginTop: 30 }}>포스팅 간판</InputTitle>
      <TypeSelector info={info} updateInfo={updateInfo} />
      <input
        placeholder={"*포스팅 제목"}
        value={info.title}
        required="true"
        onChange={e => updateInfo({ title: e.target.value })}
        className={`postInput ${
          info.title === undefined || info.title ? "" : "WARN"
        }`}
      />
      <input
        placeholder={info.type === "sell" ? "*가격" : "*한 줄 요약"}
        type={info.type === "sell" ? "number" : "text"}
        value={info.sub}
        required="true"
        onChange={e => updateInfo({ sub: e.target.value })}
        className={`postInput ${
          info.sub === undefined || info.sub ? "" : "WARN"
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
        required="true"
        value={info.content}
        style={{
          height: 50 + 16 * (info.content.match(/\n/g) || []).length
        }}
        onChange={e => updateInfo({ content: e.target.value })}
      />
      <button className="btn postSubmitBtn" type="submit">
        강군로드에 게시하기
      </button>
    </form>
  );
}
