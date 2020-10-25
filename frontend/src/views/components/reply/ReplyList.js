import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import { commentList } from "api/index.js";
import "./Reply.css";

export default function ReplyList({
  inputFocus,
  setReciever,
  setIsFocus,
  setToReply,
  postid
}) {
  const [comments, setComments] = useState('');
  useEffect(() => { 
    commentList(postid).then(response => {
        SetComments(response.data);
    });
  }, []);
  return (
    <div className="ReplyList">
      {comments.map((comment, i) => (
        <div key={i}>
          <Reply
            message={comment}
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
