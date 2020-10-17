import React from "react";
import ChatHeader from "views/components/chat/ChatHeader";
import ChatBar from "views/components/chat/ChatBar";

export default function ChattingPage({ match }) {
  return (
    <div>
      {/* 더미데이터 서형진 
      => chatId 를 암호화 해서 url로 채팅방 1:1 매칭
         + 해당 채팅방에 들어올 수 있는지 auth 체크 할 것 (backend) */}
      <ChatHeader chatId={match.params.chatId} />
      <ChatBar chatId={match.params.chatId} />
    </div>
  );
}
