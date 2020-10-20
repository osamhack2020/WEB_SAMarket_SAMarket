/* Header 의 최상단에 나타나는 Component
Home, Likes, Chats 로 화면을 이동함
*/
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { getUnreadChat } from "views/modules/common/fakeServer";
import UnreadChat from "views/components/chat/UnreadChat";
import "./Header.css";

export default function TopLinks() {
  return (
    <div className="topLinks">
      <Link exact to="/" className="btn home">
        강군마켓
      </Link>
      <LieksNChats />
    </div>
  );
}

export function LieksNChats() {
  const unreadChat = getUnreadChat();
  return (
    <Fragment>
      <Link to="/likes" className="btn likes" />
      <Link to="/chats" className="btn chats">
        {unreadChat && (
          <div className="unreadContainer">
            <UnreadChat unreadChat={unreadChat} />
          </div>
        )}
      </Link>
    </Fragment>
  );
}
