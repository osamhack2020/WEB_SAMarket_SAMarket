/* Main Page 등에서 이루어지는 검색을 다룸 */
import createReducer from "../common/createReducer";
import { useDispatch } from "react-redux";
import { WS_URL, register, signInReq, checkSession } from "api";
import { useHistory } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { logout } from "api";
import { toast } from "react-toastify";

// action type 정의
const SIGN_IN = "sign/SIGN_IN";
const SIGN_OUT = "sign/SIGN_OUT";
const SIGN_UP = "sign/SIGN_UP";
const SESSION_INVALID = "sign/session_invalid";
const SET_UNREAD = "sign/SET_UNREAD";


// action generate 함수
export const signIn = (loginResult) => {
  return { type: SIGN_IN, userInfo: loginResult.user, unread: loginResult.unread, invalid: loginResult.invalid  };
};

export const signUp = (userInfo) => {
  return async (dispatch, getState, { history }) => {
    const res = await register(userInfo);
    if (res.status == 200) {
      toast('가입이 성공적으로 완료되었습니다.');
      history.replace('/');
    }
  }
}

export const login = (userId, password) => {
  return async (dispatch, getState, { history }) => {
    const res = await signInReq(userId, password);
    if (res.status == 200) {
      dispatch(signIn(res.data));
      dispatch(startWebSocket());
      history.replace("/");
    }
  }
}

export const checkSess = () => {
  return async (dispatch, getState, { history }) => {
    try {
      const res = await checkSession();
      dispatch(signIn(res.data));
      dispatch(startWebSocket());
    } catch (err) {
      dispatch(signIn({invalid: true}));
    }
  }
}

const startWebSocket = () => {
  return async (dispatch, getState, { history }) => {
    const client = new W3CWebSocket(WS_URL);
    client.onmessage = (message) => {
      const payload = JSON.parse(message.data);
      if (payload.ChatRoomID) {
        dispatch({ type: SET_UNREAD, unread: payload.UnreadCount });
        dispatch({ type: "chat/UPDATE", chatMsg: payload.ChatMsg });
      }
    };
  }
}

export const signOut = () => {
  return async (dispatch, getState, { history }) => {
    const res = await logout();
    if (res.status == 200) {
      history.replace("/");
    }
  }
}

// reducer
export default createReducer(
  {
    userInfo: null,
    unread: 0,
    invalid: false,
  }, // initialState
  {
    [SIGN_IN]: (state, action) => {
      state.userInfo = action.userInfo
      state.unread = action.unread
      state.invalid = action.invalid || false;
    },
    [SIGN_OUT]: (state, _) => {

    },
    [SET_UNREAD]: (state, action) => {
      state.unread = action.unread;
    }
  }
);
