import React from "react";
import { useSelector } from "react-redux";
import Profile from "../user/Profile";
import "./Chat.css";

export default function Message({ message: { text, sender }, prev }) {
  const userInfo = useSelector(state => state.sign.userInfo);
  const isMyMsg = userInfo.id === sender.id;
  const isRelay = prev ? prev.sender.id === sender.id : false;
  return (
    <div
      className={`messageContainer ${
        isMyMsg ? "myMessage" : isRelay ? "relayMsg" : ""
      }`}
    >
      {!(isMyMsg || isRelay) && ( // 자기 메시지의 경우 프로필을 표시하지 않음
        <div>
          <Profile userInfo={sender} size={30} />
          <p className="senderName">{sender.name}</p>
        </div>
      )}
      <div className={`messageBox ${isMyMsg ? "byMe" : "~byMe"}`}>{text}</div>
    </div>
  );
}
