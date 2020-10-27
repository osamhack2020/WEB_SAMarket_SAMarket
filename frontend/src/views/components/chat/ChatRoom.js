import React, { useEffect, useState, createRef } from "react";
import { getPostById } from "views/modules/common/fakeServer";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rate from "views/components/rate/Rate";
import Post from "../post/Post";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import io from "socket.io-client";
import "./Chat.css";
import { NotFoundPage } from "views/pages/tempPages";
import SAHistory from "../rate/SAHistory";
import { sendChat } from "views/modules/chat/state";

let socket;

export default function ChatRoom({ search, chatRoom, messages, me, done }) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  var el = createRef();
  const sendMessage = e => {
    e.preventDefault();
    dispatch(sendChat(message));
  };
  var postId = 0;
  const postInfo = getPostById(postId);

  useEffect(() => {
    requestAnimationFrame(() => {
      document.body.scrollIntoView(false);
    });
  }, [messages]);

  return (
    <div className="chatRoom">
      {
        postId !== undefined && (
          <div className="chatPost">
            <Post info={postInfo} />
          </div>
        ) /* posting 을 통해서 생성된 채팅방 */
      }
      <MessageList divRef={el} me={me} messages={messages} />
      {done &&
        (postInfo.isClosed ? (
          <div className="chatDeal">
            <SAHistory user={me} chatRoomId={chatRoom.id} />
          </div>
        ) : (
          <Rate me={me} chatRoomId={chatRoom.id} />
        ))}
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
