/* 채팅 목록을 볼 수 있는 페이지
로그인 되어 있지 않은 경우, 로그인 요구
*/
import React from "react";

export default function ChatsPage() {
  return (
    <div>
      <div className="chatsListHead" />
      <div className="chatsList" />
      채팅 목록
    </div>
  );
}
