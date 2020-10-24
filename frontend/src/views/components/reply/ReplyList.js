import React from "react";
import Reply from "./Reply";
import "./Reply.css";

import { getChatRoom } from "views/modules/common/fakeServer";
const roomInfo = getChatRoom('0');
const { postId, members, msgs } = roomInfo;

export default function ReplyList({ messages=msgs, inputFocus }) {
  return (
    <div className="ReplyList">
      {messages.map((message, i) => (
        <div key={i}>
          <Reply message={message} inputFocus={inputFocus} />
        </div>
      ))}
    </div>
  );
}
