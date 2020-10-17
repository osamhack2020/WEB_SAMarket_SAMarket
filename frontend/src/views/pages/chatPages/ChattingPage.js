import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ChatHeader from "views/components/chat/ChatHeader";
import ChatRoom from "views/components/chat/ChatRoom";

export default function ChattingPage({ match }) {
  const chatRoomId = match.params.chatRoomId;
  if (useSelector(state => state.sign.authToken)) {
    return (
      <div>
        {/* 더미데이터 서형진 
          => chatRoomId 를 암호화 해서 url로 채팅방 1:1 매칭
         + 해당 채팅방에 들어올 수 있는지 auth 체크 할 것 (backend) */}
        <ChatHeader chatRoomId={chatRoomId} />
        <ChatRoom chatRoomId={chatRoomId} />
      </div>
    );
  }
  return <Redirect to="/" />;
}
