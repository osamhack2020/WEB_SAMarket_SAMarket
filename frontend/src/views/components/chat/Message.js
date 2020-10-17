import React from "react";
import { useSelector } from "react-redux";
import Profile from "../user/Profile";
import "./Chat.css";

export default function Message({ message: { text, sender } }) {
  const userInfo = useSelector(state => state.sign.userInfo);
  const isMyMsg = userInfo.id === sender.id;
  return (
    <div className={`messageContainer ${isMyMsg ? "myMessage" : "~myMessage"}`}>
      {!isMyMsg && ( // 자기 메시지의 경우 프로필을 표시하지 않음
        <div>
          <Profile userInfo={sender} size={30} />
          <p className="senderName">{sender.name}</p>
        </div>
      )}
      <div className={`messageBox ${isMyMsg ? "byMe" : "~byMe"}`}>{text}</div>
    </div>
  );
}
