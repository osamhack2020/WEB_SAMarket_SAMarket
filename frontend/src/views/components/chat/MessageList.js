import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import "./Chat.css";

export default function MessageList({ messages }) {
  const userInfo = useSelector(state => state.sign.userInfo);
  return (
    <div className="MessagList">
      {/* 더미 데이터 */}
      <Message
        message={{
          text: "안녕하세요!",
          sender: { name: "서형진", id: "shj0914" }
        }}
      />
      <Message
        message={{
          text: "안녕하세요~",
          sender: userInfo
        }}
      />
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
}
