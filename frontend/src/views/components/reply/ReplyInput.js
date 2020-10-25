import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { commentAdd } from "api";
import Profile from "../user/Profile";
import "./Reply.css";

export default function ReplyInput({ message, setMessage, inputRef, setIsFocus, postid, setToReply, toReply }) {
  const sendMessage = (content) => {
    commentAdd(content, postid, toReply);
  }
  const handleFocus = () => {
    setIsFocus(false);
    setToReply(0);
  };
  const userInfo = useSelector(state => state.sign.userInfo);
  return (
    <Fragment>
      <div className="replyInputContainer backdropBlur">
        <div className="replyInputInnerContainer">
          <Profile userInfo={userInfo} size={35} />
          <input
            ref={inputRef}
            className="replyInput"
            placeholder="메세지를 입력하세요"
            value={message}
            onBlur={handleFocus}
            onChange={e => setMessage(e)}
            onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
          />
          <button
            variant="contained"
            className="btn inputBtn"
            onClick={e => sendMessage(e)}
          />
        </div>
      </div>
    </Fragment>
  );
}
