/* Header 의 최상단에 나타나는 Component
Home, Likes, Chats 로 화면을 이동함
*/
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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

export function LieksNChats1(props) {
  return (
    <Fragment style={{ zIndex: 9999 }}>
      <Link to="/likes" className="btn likes" />
      <Link to="/chats" className="btn chats">
        {props.unread > 0 && (
          <div className="unreadContainer">
            <UnreadChat unreadChat={props.unread} />
          </div>
        )}
      </Link>
    </Fragment>
  );
}

const LieksNChats =  connect(
  state => ({unread: state.sign.unread })
) (LieksNChats1);
