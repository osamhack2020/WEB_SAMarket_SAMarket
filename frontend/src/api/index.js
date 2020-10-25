import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const BASE_URL = "http://nanofiber.org:8080/api";
export const WS_URL = "ws://nanofiber.org:8080/api/ws";

export async function getChatMsgList(chatRoomID) {
  return await axios.get(`${BASE_URL}/chat/msg/list/${chatRoomID}`);
}

export async function checkSession() {
  return await axios.get(`${BASE_URL}/auth/session`);
}

export async function signInReq(userId, password) {
  return await axios.post(
    `${BASE_URL}/auth/login`,
    { id: userId, pw: password }
  );
}

export async function getChatRoomList() {
  return await axios.get(`${BASE_URL}/chat/rooms`);
}

export async function commentAdd(content, postId, toReply) {
  return await axios.post(`${BASE_URL}/comment/add`, { content: content, post_id: postId, to_reply: toReply});
}


export async function commentList(postid) {
  return await axios.get(`${BASE_URL}/comment/list/${postid}`);
}


function signUpReq({ userId, userInfo }) {
  throw new Error("Sign Up Failed");
}
