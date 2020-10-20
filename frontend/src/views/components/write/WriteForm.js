/* Write Page 에서 사용하는 입력 폼 */
import React, { useState } from "react";
import styled from "styled-components";
import "./Write.css";

const InputTitle = styled.div`
  position: relative;
  right: 40px;
  margin-top: 25px;
  font-size: 14px;
  color: #05b0ea;
  text-align: right;
`;

export default function WriteForm({ info, updateInfo }) {
  return (
    <form>
      <InputTitle>포스팅 간판</InputTitle>
      <PostTypeSelector updateInfo={updateInfo} />
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
      <div>font back tag 3 가지</div>
      <InputTitle>내용</InputTitle>
      <div>줄 바꿈 가능한 글로 입력가능하도록</div>
      <button className="btn postSubmitBtn" type="submit" disabled={true}>
        강군로드에 게시하기
      </button>
    </form>
  );
}

function PostTypeSelector({ updateInfo }) {
  const [curr, setCurr] = useState("post");
  const selectType = e => {
    updateInfo({
      type: e.target.name,
      [e.target.name === "sell" ? "sub" : "_pass"]: ""
    });
    setCurr(e.target.name);
  };
  const types = [
    ["post", "일반"],
    ["adv", "광고"],
    ["sell", "판매"]
  ];

  return (
    <div className="typeSelector">
      {types.map((type, idx) => (
        <button
          className={`btn typeBtn ${type[0] === curr ? "selectedType" : ""} ${
            ["leftT", "centerT", "rightT"][idx]
          }`}
          onClick={selectType}
          type="button"
          name={type[0]}
        >
          {type[1]}
        </button>
      ))}
    </div>
  );
}

function TagInput({ info, updateInfo }) {
  // 사용자가 태그를 입력하는 영역
  const [curTag, setCurTag] = useState("");

  const pushTag = () => {
    updateInfo({
      tags: info.contents.tags.concat(curTag.slice(0, 24).replace(" ", "_"))
    });
    setCurTag("");
  };

  const popTag = e => {
    const idx = info.contents.tags.indexOf(e.target.value);
    info.contents.tags.splice(idx, 1);
    updateInfo({ tags: info.contents.tags });
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        placeholder="# 태그를 달아주세요."
        value={curTag}
        onChange={e => setCurTag(e.target.value)}
        onKeyPress={e => (e.key === "Enter" ? pushTag(e) : null)}
        className={`postInput tagInput ${curTag.length > 24 ? "WARN" : ""}`}
      />
      {curTag.length > 24 && (
        <div className="tagWarn">태그는 24글자를 넘을 수 없습니다.</div>
      )}
      <button
        variant="contained"
        className="btn plusTagBtn"
        type="button"
        onClick={pushTag}
      />
      <div className="tagContainer">
        <div className="tagList">태그 목록</div>
        {info.contents.tags.length === 0 && "태그가 없습니다."}
        {info.contents.tags.map(tag => (
          <button
            className="btn tagRmBtn"
            onClick={popTag}
            type="button"
            value={tag}
          >
            <div className="xBlue" />
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
