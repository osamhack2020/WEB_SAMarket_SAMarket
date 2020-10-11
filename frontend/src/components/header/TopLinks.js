import React from "react";
import "./Header.css";

const TopLinks = () => {
  const switchPage = (idx) => {
    /* Page 전환: Home, Likes, Chats 순서로 */
    return {};
  };

  return (
    <div className="topLinks">
      <button onClick={switchPage(0)} className="home">
        강군마켓
      </button>
      <button onClick={switchPage(1)} className="likes" />
      <button onClick={switchPage(2)} className="chats" />
    </div>
  );
};

export default TopLinks;
