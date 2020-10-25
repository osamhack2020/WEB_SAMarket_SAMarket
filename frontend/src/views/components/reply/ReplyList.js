import React from "react";
import Reply from "./Reply";
import "./Reply.css";

export default function ReplyList({
  inputFocus,
  setReciever,
  setIsFocus,
  setToReply,
  comments
}) {
  return (
    <div className="ReplyList">
      {comments.map(comment => (
        <div key={comment.id}>
          <Reply
            comment={comment}
            inputFocus={inputFocus}
            setReciever={setReciever}
            setIsFocus={setIsFocus}
            setToReply={setToReply}
          />
        </div>
      ))}
    </div>
  );
}
