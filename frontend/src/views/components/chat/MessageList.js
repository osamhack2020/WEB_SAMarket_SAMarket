import React, { useState } from "react";
import Message from "./Message";
import "./Chat.css";

export default function MessageList({ messages }) {
  const [prev, setPrev] = useState("");

  return (
    <div className="MessagList">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} prev={messages[i - 1]} />
        </div>
      ))}
    </div>
  );
}
