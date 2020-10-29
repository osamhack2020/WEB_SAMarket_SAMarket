import React, { useState, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import ChatHeader from "views/components/chat/ChatHeader";
import ChatRoom from "views/components/chat/ChatRoom";
import { loadChatMsg } from "views/modules/chat/state";

function ChattingPage({ match, chatMsgList, currentChatRoom }) {
  const userInfo = useSelector(state => state.sign.userInfo);
  const chatRoomId = match.params.chatRoomId;
  const [status, setStatus] = useState(currentChatRoom.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadChatMsg(chatRoomId));
  }, []);
  useEffect(() => {
    setStatus(currentChatRoom.status);
  }, [currentChatRoom]);
  const st = { status, setStatus };
  return (
    <div>
      <ChatHeader st={st} chatRoom={currentChatRoom}/>
      <ChatRoom
        st={st}
        chatRoom={currentChatRoom}
        messages={chatMsgList}
        me={userInfo}
      />
    </div>
  );
}

export default connect(
  state => ({ chatMsgList: state.chat.chatMsgList, currentChatRoom: state.chat.currentChatRoom })
) (ChattingPage);
