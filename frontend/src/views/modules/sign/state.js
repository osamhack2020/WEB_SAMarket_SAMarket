/* Main Page 등에서 이루어지는 검색을 다룸 */
import createReducer from "../common/createReducer";
import { users } from "data/users.json";
import { useDispatch } from "react-redux";
import { signInReq, checkSession } from "api";
import { useHistory } from "react-router-dom";

// action type 정의
const SIGN_IN = "sign/SIGN_IN";
const SIGN_OUT = "sign/SIGN_OUT";
const SIGN_UP = "sign/SIGN_UP";
const SESSION_INVALID = "sign/session_invalid";


// action generate 함수
export const signIn = (loginResult) => {
  return { type: SIGN_IN, userInfo: loginResult.user, unread: loginResult.unread, invalid: loginResult.invalid  };
};

export const login = (userId, password) => {
  return async (dispatch, getState, { history }) => {
    const res = await signInReq(userId, password);
    if (res.status == 200) {
      dispatch(signIn(res.data));
      history.replace("/");
    }
  }
}

export const checkSess = () => {
  return async (dispatch, getState, { history }) => {
    try {
      const res = await checkSession();
      dispatch(signIn(res.data));
    } catch (err) {
      dispatch(signIn({invalid: true}));
    }
  }
}

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const signUp = (userId, userInfo) => {
  return { type: SIGN_UP, userId, userInfo };
};

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
      console.log(action)
    },
    [SIGN_OUT]: (state, _) => {

    },
    [SIGN_UP]: (state, action) => {
     
    }
  }
);
