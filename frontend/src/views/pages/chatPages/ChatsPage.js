/* 채팅 목록을 볼 수 있는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getChatRoomList } from "api";
import BackBtn from "views/components/header/BackBtn";
import SearchBar from "views/components/header/SearchBar";
import UnreadChat from "views/components/chat/UnreadChat";
import Profile from "views/components/user/Profile";
import { loadChatRooms } from "views/modules/chat/state";
import "./ChatPage.css";
import Moment from "react-moment";

function ChatsPage(props) {
  const [chatKeyword, setKeyword] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { chatRoomList } = props;
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(loadChatRooms());
  }, []);

  /*
  getChatList().filter(
    chatInfo =>
      chatInfo.chatTitle.indexOf(chatKeyword) !== -1 ||
      chatInfo.members.filter(member => member.name.indexOf(chatKeyword) !== -1)
        .length
  ); // 채팅방 제목에 검색어가 있거나, 멤버에 검색어가 있는 경우
  */
  const userInfo = useSelector(state => state.sign.userInfo);

  return (
    <div>
      <ChatsHeader setKeyword={setKeyword} />
      <div className="chatList">
        {chatRoomList.map(chatInfo => (
          <ChatInfo key={chatInfo.id} info={chatInfo} myId={userInfo.id}/>
        ))}
      </div>
    </div>
  );
}

export default connect(
  state => ({ chatRoomList: state.chat.chatRoomList })
) (ChatsPage);

function ChatsHeader({ setKeyword }) {
  // 채팅 목록 상단에 있는 검색 가능한 헤드
  const startChat = () => {
    // chatting 시작을 위한 dialog 띄울 것
  };
  return (
    <h2 className="listHead backdropBlur">
      마음의 편지함
      <BackBtn loc={[32, 10]} />
      <button className="btn chatWriteBtn" onClick={startChat} />
      <SearchBar onSearch={keyword => setKeyword(keyword)} realTime={true} />
    </h2>
  );
}

function ChatInfo({ info, myId }) {
  // 채팅 정보를 보여주는 component
  const { title, id, members, unread } = info;
  const users = members.filter(member => member.id !== myId);
  const lastMsg = info.lastmsg;

  return (
    <Link to={`/chat/${id}`} className="btn chatInfo">
      <ChatThumbnail users={users.slice(0, 3)} />
      {title}
      <p className="lastChat">{`${lastMsg.text.slice(0, 16)}${
        lastMsg.text.length > 16 ? ".." : ""
      }`}</p>
      <LastChatTime time={info.created_at} />
      {unread > 0 && (
        <div className="unreadMsg">
          <UnreadChat unreadChat={unread} />
        </div>
      )}
    </Link>
  );
}

function ChatThumbnail({ users }) {
  // 채팅방의 썸네일, 참여자 중 나를 제외한 최대 3명을 보여줌
  const size = users.length > 1 ? 25 : 40;

  return (
    <div className="chatThumbnail">
      {users.map((user, idx) => (
        <Profile
          userInfo={user}
          size={size}
          loc={idx ? [20 - 5 * (users.length - idx), 33 - 43 * idx] : [0, 0]}
        />
      ))}
    </div>
  );
}

function LastChatTime({ time }) {
  return (
    <div className="lastTime">
      <Moment format="MM/DD HH:mm">{time}</Moment>
    </div>
  );
}

function getTime(today, time) {
  const [hour, minute] = [today.getHours(), today.getMinutes()];
  const [h, m] = time.split(":").map(t => parseInt(t));
  if (hour === h) {
    if (minute === m) return "방금";
    return `${minute - m}분 전`;
  } else if (hour - h < 6) return `${hour - h}시간 전`;
  return time;
}
