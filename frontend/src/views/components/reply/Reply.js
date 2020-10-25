import React, { Fragment } from "react";
import Profile from "../user/Profile";
import Rereply from "./Rereply.js";
import "./Reply.css";

export default function Reply({
  message: { comment },
  inputFocus,
  setReciever,
  setIsFocus,
  setToReply
}) {
  const handleReciever = () => {
    inputFocus();
    setReciever(comment.user.name);
    setIsFocus(true);
    setToReply(comment.id)
  };
  return (
    <Fragment>
      <div className="replyContainer">
        <div>
          <Profile userInfo={comment.user} size={30} />
          <p className="senderName">{comment.user.name}</p>
        </div>
        <div className="replyBox">
          <div className="replyText">{comment.content}</div>
          <div className="replyFooter">
            <div className="replyDate">
              {" "}
              {comment.createdAt.format("MM/dd")} {comment.createdAt.format("HH:mm")}{" "}
            </div>
            <div onClick={handleReciever} className="replyButton">
              <div className="heartIcon"></div>
              <div>답글달기</div>
            </div>
          </div>
        </div>
      </div>
      {comment.replies.map((reply, i) => (
        <div key={i}>
          <Rereply message={{ reply }} />
        </div>
      ))}
    </Fragment>
  );
}
