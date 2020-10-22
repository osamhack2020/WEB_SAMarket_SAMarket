import React from "react";
import BackBtn from "../header/BackBtn";
import "./Chat.css";

export default function ChatHeader({ chatRoomTitle, done, setDone }) {
  // chatRoomTitle 을 얻어오는 logic 필요
  return (
    <div className="chatHead backdropBlur">
      <div className="chatTtitle">{chatRoomTitle}</div>
      <BackBtn />
      <button
        className="btn doneBtn"
        onClick={() => setDone(true)}
        disabled={done}
      >
        {done ? "이미 종료되었습니다" : "거래 종료하기"}
      </button>
    </div>
  );
}
