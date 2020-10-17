import React from "react";
import ChatBar from "../components/chat/ChatBar";
import ChatHeader from "../components/chat/ChatHeader";

export default function ChattingPage() {
  return (
    <div>
      <ChatHeader /* 더미 데이터 "서형진" */ title="서형진" />
      <ChatBar />
    </div>
  );
}
