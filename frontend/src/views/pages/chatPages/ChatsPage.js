/* 채팅 목록을 볼 수 있는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React, { useState } from "react";
import { getChatList } from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";
import SearchBar from "views/components/header/SearchBar";
import "./ChatPage.css";

export default function ChatsPage() {
  const [chatKeyword, setKeyword] = useState("");
  const filtered = getChatList().filter(
    chatInfo =>
      chatInfo.chatTitle.indexOf(chatKeyword) !== -1 ||
      chatInfo.members.indexOf(chatKeyword) !== -1
  ); // 채팅방 제목에 검색어가 있거나, 멤버에 검색어가 있는 경우

  return (
    <div>
      <ChatsHeader setKeyword={setKeyword} />
      <div className="chatList">
        {filtered.map(chatInfo => (
          <ChatInfo info={chatInfo} />
        ))}
      </div>
    </div>
  );
}

function ChatsHeader({ setKeyword }) {
  // 채팅 목록 상단에 있는 검색 가능한 헤드
  return (
    <div className="chatsListHead">
      <BackBtn loc={[30, 10]} />
      마음의 편지함
      <button className="btn chatWriteBtn" />
      <SearchBar onSearch={keyword => setKeyword(keyword)} />
    </div>
  );
}

function ChatInfo({ info }) {
  // 채팅 목록을 보여주는 component
  return <div />;
}
