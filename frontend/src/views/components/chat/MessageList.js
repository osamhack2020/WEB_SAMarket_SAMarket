import React from "react";
import Message from "./Message";
import "./Chat.css";

export default function MessageList({ messages, name }) {
  return (
    <div className="MessagList">
      {/* 더미 데이터 */}
      <Message
        message={{ text: "안녕하세요!", user: "서형진" }}
        name={"고현수"}
      />
      <Message
        message={{ text: "안녕하세요~", user: "고현수" }}
        name={"고현수"}
      />
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
}
