/* 안 읽은 메시지를 표시하는 컴포넌트 */
import React from "react";
import "./Chat.css";

export default function UnreadChat({ unreadChat }) {
  return (
    <div className="unreadChat">{unreadChat > 99 ? "99+" : unreadChat}</div>
  );
}
