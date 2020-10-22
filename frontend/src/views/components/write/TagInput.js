import React, { useState } from "react";

export default function TagInput({ info, updateInfo }) {
  // 사용자가 태그를 입력하는 영역
  const [curTag, setCurTag] = useState("");

  const pushTag = () => {
    if (curTag.length > 0) {
      updateInfo({
        tags: info.contents.tags.concat(curTag.slice(0, 24).replace(" ", "_"))
      });
      setCurTag("");
    }
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
