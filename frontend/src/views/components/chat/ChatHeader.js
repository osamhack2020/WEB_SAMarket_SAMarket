import React from "react";
import Button from "@material-ui/core/Button";
import "./Chat.css";
import BackBtn from "../header/BackBtn";

export default function ChatHeader({ chatId }) {
  // chatTitle 을 얻어오는 logic 필요
  return (
    <div className="chatHead">
      <div className="chatTtitle">{chatId}</div>
      <BackBtn />
    </div>
  );
}
