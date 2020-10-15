<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Input from "./Input";
import MessageList from "./MessageList";
import "./Chat.css";
=======
import React, { useEffect, useState } from 'react';
import Input from './Input'
import MessageList from './MessageList'
import io from 'socket.io-client';
import './Chat.css';
>>>>>>> feat: 채팅 페이지에 Input 컴포넌트 적용

let socket;

const ChatBar = location => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState("");

  const ENDPOINT = "nanofiber.org:8080/ws";
  // const ENDPOINT = config.blabla 백 작업 후 추가예정.

  useEffect(() => {
    // query-string middleware의 사용
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT); // 소켓 연결

    socket.emit("join", { name, room }, error => {
      // console.log("error");
      // 에러 처리
      if (error) {
        alert(error);
      }
    });

    // return () => {
    //   socket.emit("disconnect");

    //   socket.off();
    // };
  }, [ENDPOINT, location.search]);
  // 한번만 부른다
  // 불필요한 사이드 이펙트를 줄인다.

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

    return (
        <div className="chatOuterContainer">
            <div className="chatInnerContainer">
                <div className="chatScreen">
                    <div className="chatScreenPaper">
                        <Input
                            message={message}
                            setMessage={setMessage}
                            sendMessage={sendMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
/*
class ChatBar extends Component {
    render() {
        return (
            <div className='ChatBar'/>
        );
    }
}
*/
export default ChatBar;
