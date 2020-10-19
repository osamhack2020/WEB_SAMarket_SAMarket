import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getChatRoom } from "views/modules/common/fakeServer";
import ChatHeader from "views/components/chat/ChatHeader";
import ChatRoom from "views/components/chat/ChatRoom";

export default function ChattingPage({ match }) {
  const chatRoomId = match.params.chatRoomId;
  const roomInfo = getChatRoom(chatRoomId);
  const { chatTitle, members } = roomInfo;
  if (useSelector(state => state.sign.authToken) && members) {
    return (
      <div>
        {/* 더미데이터 서형진 
          => chatRoomId 를 암호화 해서 url로 채팅방 1:1 매칭
         + 해당 채팅방에 들어올 수 있는지 auth 체크 할 것 (backend) */}
        <ChatHeader chatRoomTitle={chatTitle} />
        <ChatRoom chatRoomId={chatRoomId} roomInfo={roomInfo} />
      </div>
    );
  }
  return <Redirect to="/" />;
}
