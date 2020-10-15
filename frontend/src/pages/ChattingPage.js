import React from "react";
import ChatBar from "../components/chat/ChatBar";
import ChatHeader from "../components/chat/ChatHeader";
import PostInfo from "../components/post/PostInfo";

export default function ChattingPage(props) {
  return (
    <div className="ChattingPage">
      <ChatHeader /* 더미 데이터 "서형진" */ user="서형진" />
      <PostInfo />
      <ChatBar />
    </div>
  );
}
