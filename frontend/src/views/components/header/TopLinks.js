/* Header 의 최상단에 나타나는 Component
Home, Likes, Chats 로 화면을 이동함
*/
import { Link } from "react-router-dom";
import React from "react";
import "./Header.css";

export default function TopLinks() {
  return (
    <div className="topLinks">
      <Link exact to="/" className="home">
        강군마켓
      </Link>
      <Link to="/likes" className="likes" />
      <Link to="/chats" className="chats" />
    </div>
  );
}
