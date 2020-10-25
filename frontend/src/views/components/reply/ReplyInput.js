import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { commentAdd } from "api";
import Profile from "../user/Profile";
import "./Reply.css";

export default function ReplyInput({ message, setMessage, inputRef, setIsFocus, postid, setToReply, toReply, dataUpdate }) {
  const sendMessage = (content) => {
    commentAdd(content, postid, toReply).then(() => {
      setMessage("");
      setToReply(null);
      dataUpdate();
    }
    );
  }
  const handleFocus = () => {
    setIsFocus(false);
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
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => (e.key === "Enter" ? sendMessage(message) : null)}
          />
          <button
            variant="contained"
            className="btn inputBtn"
            onClick={e => sendMessage(message)}
          />
        </div>
      </div>
    </Fragment>
  );
}
