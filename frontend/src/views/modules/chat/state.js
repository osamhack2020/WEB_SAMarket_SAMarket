/* Main Page 등에서 이루어지는 검색을 다룸 */
import createReducer from "../common/createReducer";
import { sendChatMsg, getChatRoomList, getChatMsgList } from "api";
// action type 정의
const UPDATE = "chat/UPDATE";
const SETROOMLIST = "chat/SETROOMLIST";
const SETCURRENTROOM = "chat/SETCURRENTROOM";
const SENT = "chat/sent";

export const sendChat = (msg) => {
  return async (dispatch, getState, { history }) => {
    const chat_room_id = getState().chat.currentChatRoom.id;
    const res = await sendChatMsg({ chat_room_id, text: msg });
    dispatch({ type: SENT, sentMsg: res.data });
  };
}
export const loadChatRooms = () => {
  return async (dispatch, getState, { history }) => {
    try {
      const res = await getChatRoomList();
      dispatch({ type: SETROOMLIST, chatRoomList: res.data });
    } catch (err) {

    }
  }
}

export const loadChatMsg = (roomid) => {
  return async (dispatch, getState, { history }) => {
    try {
      const res = await getChatMsgList(roomid);
      dispatch({type : SETCURRENTROOM, currentChatRoom: res.data.chat_room, chatMsgList: res.data.msgs });
    } catch (err) {

    }
  }
}


// reducer
export default createReducer(
  {
    chatRoomList: [],
    chatMsgList: [],
    currentChatRoom: {},
  },
  {
    [SENT]: (state, action) => {
      state.chatMsgList.push(action.sentMsg);
    },
    [UPDATE]: (state, action) => {
      const { chatMsg } = action;
      state.chatRoomList.map((chatRoom) => {
        if (chatRoom.id == chatMsg.chat_room_id) {
          ++chatRoom.unread;
          chatRoom.lastmsg = chatMsg;
        }
      })
      if (state.currentChatRoom.id == chatMsg.chat_room_id)
        state.chatMsgList.push(chatMsg);
    },
    [SETROOMLIST]: (state, action) => {
      state.chatRoomList = action.chatRoomList;
    },
    [SETCURRENTROOM]: (state, action) => {
      state.currentChatRoom = action.currentChatRoom
      state.chatMsgList = action.chatMsgList
    }
  }
);
