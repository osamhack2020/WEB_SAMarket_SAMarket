import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { commentAdd } from "api";
import Profile from "../user/Profile";
import "./Reply.css";

export default function ReplyInput({
  inputRef,
  setIsFocus,
  postid,
  setToReply,
  toReply,
  dataUpdate
}) {
  const userInfo = useSelector(state => state.sign.userInfo);
  const sendMessage = content => {
    commentAdd(content, postid, toReply).then(() => {
      const isReply = !!toReply;
      inputRef.current.value = "";
      setToReply(null);
      dataUpdate();
      handleFocus();
      if (!isReply) {
        requestAnimationFrame(() => {
          document.body.scrollIntoView(false);
        });
      }
    });
  };
  const handleFocus = () => {
    setIsFocus(false);
  };
  return (
    <Fragment>
      <div className="replyInputContainer backdropBlur">
        <div className="replyInputInnerContainer">
          <Profile userInfo={userInfo} size={35} />
          <input
            ref={inputRef}
            className="replyInput"
            placeholder="메세지를 입력하세요"
            onBlur={handleFocus}
            onKeyPress={e =>
              e.key === "Enter" ? sendMessage(inputRef.current.value) : null
            }
          />
          <button
            variant="contained"
            className="btn inputBtn"
            onClick={e => sendMessage(inputRef.current.value)}
          />
        </div>
      </div>
    </Fragment>
  );
}
