import React, { useEffect, useState } from "react";
import { getPostById } from "views/modules/common/fakeServer";
import { Redirect } from "react-router-dom";
import Post from "../post/Post";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import io from "socket.io-client";
import "./Chat.css";

let socket;

export default function ChatRoom({ search, chatRoomId, roomInfo, me }) {
  const { postId, members, msgs } = roomInfo;
  // room을 사용하지 않고 있음
  // name 은 redux 에서 로그인된 계정 정보를 직접 가져오는 방식으로 수정
  const [room, setRoom] = useState("");

  // chatting 에 사용
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(msgs ? msgs : []);
  // users 도 사용하지 않고 있음
  const [users, setUsers] = useState(members ? members : []);

  const ENDPOINT = "nanofiber.org:8080/ws";
  // const ENDPOINT = config.blabla 백 작업 후 추가예정.

  useEffect(() => {
    // 더미 데이터
    const { id, room } = { id: me.id, room: chatRoomId };
    // query-string middleware의 사용
    // const { id, room } = queryString.parse(search);
    setRoom(room);

    socket = io(ENDPOINT); // 소켓 연결
    socket.emit("join", { id, room }, error => {
      // 에러 처리
      if (error) {
        alert(error);
      }
    });

    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  }, [ENDPOINT, search]);
  // 한번만 부른다. 불필요한 사이드 이펙트를 줄인다.

  useEffect(() => {
    // 서버에서 message 이벤트가 올 경우에 대해서 `on`
    // 메세지 수신
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    // room에 유저 추가/삭제
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  // 메세지 송신
  const sendMessage = e => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, setMessage(""));
    }
  };

  return users ? (
    <div className="chatRoom">
      {
        postId !== undefined && (
          <div className="chatPost">
            <Post info={getPostById(postId)} />
          </div>
        ) /* posting 을 통해서 생성된 채팅방 */
      }
      <MessageList me={me} messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  ) : (
    <Redirect to="NotFound" />
  );
}
