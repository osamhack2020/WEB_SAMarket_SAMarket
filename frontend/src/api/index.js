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


function signUpReq({ userId, userInfo }) {
  throw new Error("Sign Up Failed");
}
