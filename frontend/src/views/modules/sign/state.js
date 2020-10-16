/* Main Page 등에서 이루어지는 검색을 다룸 */
import createReducer from "../common/createReducer";
import { signInReq, signUpReq } from "../common/fakeServer";

// action type 정의
const SIGN_IN = "sign/SIGN_IN";
const SIGN_OUT = "sign/SIGN_OUT";
const SIGN_UP = "sign/SIGN_UP";

// action generate 함수
export const signIn = (userId, password) => {
  return { type: SIGN_IN, userId, password };
};
export const signOut = () => {
  return { type: SIGN_OUT };
};
export const signUp = (userId, userInfo) => {
  return { type: SIGN_UP, userId, userInfo };
};

// reducer
export default createReducer(
  {
    userId: localStorage.getItem("userId"),
    authToken: localStorage.getItem("authToken")
  }, // initialState
  {
    [SIGN_IN]: (state, action) => {
      if (!state.userId) {
        try {
          const user = signInReq({
            userId: action.userId,
            password: action.password
          });
          state.userId = action.userId;
          state.authToken = user;
          localStorage.setItem("userId", state.userId);
          localStorage.setItem("authToken", state.authToken);
        } catch {
          alert("Sign In Failed");
        }
      }
    },
    [SIGN_OUT]: (state, _) => {
      if (state.authToken) {
        state.userId = null;
        state.authToken = null;
        localStorage.removeItem("userId");
        localStorage.removeItem("authToken");
      }
    },
    [SIGN_UP]: (state, action) => {
      try {
        const user = signUpReq({
          userId: action.userId,
          userInfo: action.userInfo
        });
        state.userId = action.userId;
        state.authToken = user;
      } catch {
        alert("Sign Up Failed");
      }
    }
  }
);
