import React from "react";
import Message from "./Message";
import "./Chat.css";

export default function MessageList({ me, messages }) {
  return (
    <div className="MessagList">
      {messages.map((message, i) => (
        <div key={i}>
          <Message me={me} message={message} prev={messages[i - 1]} />
        </div>
      ))}
    </div>
  );
}
