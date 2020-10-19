import React from "react";
import { useSelector } from "react-redux";
import Profile from "../user/Profile";
import "./Chat.css";

export default function ChatInput({ message, setMessage, sendMessage }) {
  const userInfo = useSelector(state => state.sign.userInfo);
  return (
    <div className="chatInputContainer backdropBlur">
      <div className="chatInputInnerContainer">
        <Profile userInfo={userInfo} size={35} />
        <input
          className="chatInput"
          placeholder="메세지를 입력하세요"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button
          variant="contained"
          className="btn inputBtn"
          onClick={e => sendMessage(e)}
        />
      </div>
    </div>
  );
}
