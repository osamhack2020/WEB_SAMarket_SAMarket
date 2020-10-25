import axios from 'axios';

const BASE_URL = "http://nanofiber.org:8080/api"

export async function checkSession() {
  return await axios.get(`${BASE_URL}/auth/session`, {withCredentials: true});
}

export async function signInReq(userId, password) {
  return await axios.post(`${BASE_URL}/auth/login`, { id : userId, pw: password}, {withCredentials: true});
}

export async function getChatList() {
  return await axios.get(`${BASE_URL}/chat/rooms`, {withCredentials: true});
}

export async function commentAdd(content, postid, toreply) {
  return await axios.post(`${baseUrl}/comment/add`, { content: content, postID: postid, toreply: toreply});
}


export async function commentList(postid) {
  return await axios.get(`${baseUrl}/comment/list/${postid}`);
}


function signUpReq({ userId, userInfo }) {
  throw new Error("Sign Up Failed");
}
