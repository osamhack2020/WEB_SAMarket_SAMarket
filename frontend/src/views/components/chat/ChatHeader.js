import React from "react";
import Button from "@material-ui/core/Button";
import "./Chat.css";
import BackBtn from "../header/BackBtn";

export default function ChatHeader({ chatRoomId }) {
  // chatRoomTitle 을 얻어오는 logic 필요
  const chatRoomTitle = chatRoomId;
  return (
    <div className="chatHead">
      <div className="chatTtitle">{chatRoomTitle}</div>
      <BackBtn />
    </div>
  );
}
