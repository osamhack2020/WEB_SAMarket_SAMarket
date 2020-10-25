import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import { commentList } from "api";
import "./Reply.css";

export default function ReplyList({
  inputFocus,
  setReciever,
  setIsFocus,
  setToReply,
  postid
}) {
  const [comments, setComments] = useState([]);
  useEffect(() => { 
    commentList(postid).then(response => {
      setComments(response.data);
    });
  }, []);
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
