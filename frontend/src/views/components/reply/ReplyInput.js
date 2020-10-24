import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Profile from "../user/Profile";
import "./Reply.css";

export default function ReplyInput({ message, setMessage, sendMessage, inputRef, replyUser }) {
  const userInfo = useSelector(state => state.sign.userInfo);
  return (
    <Fragment>
      <div>"{replyUser}"님에게 답글을 작성 중입니다.</div>
      <div className="replyInputContainer backdropBlur">
        <div className="replyInputInnerContainer">
          <Profile userInfo={userInfo} size={35} />
          <input
            ref={inputRef}
            className="replyInput"
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
    </Fragment>
  );
}
