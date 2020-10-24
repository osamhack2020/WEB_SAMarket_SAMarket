import React, { Fragment, useState } from "react";
import Profile from "../user/Profile";
import "./Reply.css";
import { getChatRoom } from "views/modules/common/fakeServer";
const roomInfo = getChatRoom("0");
const { postId, members, msgs } = roomInfo;

export default function Reply({
  message,
  date = "10/22",
  time = "09:45",
  inputFocus
}) {
  return (
    <ReplyBase
      message={message}
      date={date}
      time={time}
      inputFocus={inputFocus}
    >
      <Rereply message={message} inputFocus={inputFocus} />
    </ReplyBase>
  );
}

export function Rereply({ message, date = "10/22", time = "09:45" }) {
  return <ReplyBase message={message} date={date} time={time} reReply={true} />;
}

function ReplyBase({
  message: { text, sender },
  date = "10/22",
  time = "09:45",
  inputFocus,
  reReply = false,
  children
}) {
  const [liked, setLiked] = useState(false);
  const likeReply = () => {
    setLiked(!liked);
    // call the api
  };

  return (
    <Fragment>
      <div className={`replyContainer ${reReply ? "rereply" : ""}`}>
        <div>
          <Profile userInfo={sender} size={35} />
          <p className="replyName">{sender.name}</p>
        </div>
        <div className="replyBox">
          <div className="replyText">{text}</div>
          <div className="replyFooter">
            <div className="replyDate">
              {date} {time}
            </div>
            {!reReply && (
              <button onClick={inputFocus} className="btn replyButton">
                답글달기
              </button>
            )}
            <button
              onClick={likeReply}
              className={`btn like${liked ? "d" : ""}Icon`}
            />
          </div>
        </div>
      </div>
      {children}
    </Fragment>
  );
}
