/* 채팅 목록을 볼 수 있는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getChatList } from "views/modules/common/fakeServer";
import BackBtn from "views/components/header/BackBtn";
import SearchBar from "views/components/header/SearchBar";
import UnreadChat from "views/components/chat/UnreadChat";
import "./ChatPage.css";
import Profile from "views/components/user/Profile";

export default function ChatsPage() {
  const [chatKeyword, setKeyword] = useState("");
  const userId = useSelector(state => state.sign.userId);
  const filtered = getChatList().filter(
    chatInfo =>
      chatInfo.chatTitle.indexOf(chatKeyword) !== -1 ||
      chatInfo.members.filter(member => member.name.indexOf(chatKeyword) !== -1)
        .length
  ); // 채팅방 제목에 검색어가 있거나, 멤버에 검색어가 있는 경우

  return (
    <div>
      <ChatsHeader setKeyword={setKeyword} />
      <div className="chatList">
        {filtered.map(chatInfo => (
          <ChatInfo info={chatInfo} myId={userId} />
        ))}
      </div>
    </div>
  );
}

function ChatsHeader({ setKeyword }) {
  // 채팅 목록 상단에 있는 검색 가능한 헤드
  const startChat = () => {
    // chatting 시작을 위한 dialog 띄울 것
  };
  return (
    <h1 className="chatsListHead backdropBlur">
      마음의 편지함
      <BackBtn loc={[32, 10]} />
      <button className="btn chatWriteBtn" onClick={startChat} />
      <SearchBar onSearch={keyword => setKeyword(keyword)} realTime={true} />
    </h1>
  );
}

function ChatInfo({ info, myId }) {
  // 채팅 정보를 보여주는 component
  const { chatTitle, chatRoomId, members, unreadChat, msgs } = info;
  const users = members.filter(member => member.id !== myId);
  const lastMsg = msgs[msgs.length - 1];

  return (
    <Link to={`/chat/${chatRoomId}`} className="chatInfo">
      <ChatThumbnail users={users.slice(0, 3)} />
      {chatTitle}
      <p className="lastChat">{`${lastMsg.text.slice(0, 16)}${
        lastMsg.text.length > 16 ? ".." : ""
      }`}</p>
      {unreadChat > 0 && (
        <div className="unreadMsg">
          <UnreadChat unreadChat={unreadChat} />
        </div>
      )}
    </Link>
  );
}

function ChatThumbnail({ users }) {
  const size = 40 - 15 * (users.length - 1);

  return (
    <div className="chatThumbnail">
      {users.map((user, idx) => (
        <Profile userInfo={user} size={size} loc={[15 * idx, -10 * idx]} />
      ))}
    </div>
  );
}
