import React, { useState, useEffect } from "react";
import BackBtn from "../header/BackBtn";
import "./Chat.css";
import { endChat } from "api";
import { customHistory } from "index";

export default function ChatHeader({ chatRoom, st }) {
  // chatRoomTitle 을 얻어오는 logic 필요

  return (
    <div className="chatHead backdropBlur">
      <div className="chatTtitle">{chatRoom.title}</div>
      <BackBtn />
      <button
        className="btn doneBtn"
        onClick={() => {
          st.setStatus(1);
          endChat(chatRoom.id).then(response => {
            
          });
        }}
        disabled={st.status != 0}
      >
        {["거래 종료하기", "거래가 완료되었습니다.", "종료된 거래입니다.", "거래 완료"][st.status]}
      </button>
    </div>
  );
}
