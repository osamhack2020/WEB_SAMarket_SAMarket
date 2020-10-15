import React from "react";
import ChatBar from "../components/chat/ChatBar";
import ChatHeader from "../components/chat/ChatHeader";

export default function ChattingPage(props) {
  return (
    <div className="ChattingPage">
      <ChatHeader /* 더미 데이터 "서형진" */ user="서형진" />
      <ChatBar />
    </div>
  );
}
