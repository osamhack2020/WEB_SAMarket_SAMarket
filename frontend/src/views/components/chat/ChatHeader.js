import React from "react";
import BackBtn from "../header/BackBtn";
import "./Chat.css";

export default function ChatHeader({ chatRoomTitle }) {
  // chatRoomTitle 을 얻어오는 logic 필요
  return (
    <div className="chatHead backdropBlur">
      <div className="chatTtitle">{chatRoomTitle}</div>
      <BackBtn />
    </div>
  );
}
