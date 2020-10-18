import React from "react";
import BackBtn from "../header/BackBtn";
import "./Chat.css";

export default function ChatHeader({ chatRoomId }) {
  // chatRoomTitle 을 얻어오는 logic 필요
  const chatRoomTitle = chatRoomId;
  return (
    <div className="chatHead backdropBlur">
      <div className="chatTtitle">{chatRoomTitle}</div>
      <BackBtn />
    </div>
  );
}
