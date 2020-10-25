import React, { useState, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import ChatHeader from "views/components/chat/ChatHeader";
import ChatRoom from "views/components/chat/ChatRoom";
import { loadChatMsg } from "views/modules/chat/state";

function ChattingPage({ match, chatMsgList, currentChatRoom }) {
  const userInfo = useSelector(state => state.sign.userInfo);
  const chatRoomId = match.params.chatRoomId;
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadChatMsg(chatRoomId));
  }, []);
  return (
    <div>
      <ChatHeader chatRoomTitle={currentChatRoom.title} done={done} setDone={setDone} />
      <ChatRoom
        chatRoom={currentChatRoom}
        messages={chatMsgList}
        me={userInfo}
        done={done}
      />
    </div>
  );
}

export default connect(
  state => ({ chatMsgList: state.chat.chatMsgList, currentChatRoom: state.chat.currentChatRoom })
) (ChattingPage);
