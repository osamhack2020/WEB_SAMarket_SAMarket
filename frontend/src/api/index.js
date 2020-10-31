import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import { toast } from "react-toastify";

const BASE_URL = "/api";
export const WS_URL = `${window.location.protocol == "http:" ? "ws://" : "wss://"}${window.location.host}/api/ws`;

let history = null;
let postUpdated = false;

const http = axios.create({
  baseURL: BASE_URL,
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false
  }),
  withCredentials: true
});

http.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.msg, {
        autoClose: 3000,
      });
    }
    return Promise.reject(error);
  }
);


function historyPopCache() {
  return {
    forceUpdate: postUpdated || (history && history.action === "PUSH"),
    cache: true,
    withCredentials: true
  };
  postUpdated = false;
}

export function setHistory(h) {
  history = h;
  console.log(history);
}

export function setPostUpdated(x) {
  postUpdated = x;
}

export async function getChatMsgList(chatRoomID) {
  return await http.get(`/chat/msg/list/${chatRoomID}`);
}

export async function checkSession() {
  return await http.get(`/auth/session`);
}

export async function signInReq(userId, password) {
  return await http.post(`/auth/login`, {
    id: userId,
    pw: password
  });
}

export async function getChatRoom(chatRoomID) {
  return await http.get(`/chat/room/{chatRoomID}`);
}

export async function getChatRoomList() {
  return await http.get(`/chat/rooms`);
}

export async function sendChatMsg(msg) {
  return await http.post(`/chat/msg/send`, msg);
}

export async function commentAdd(content, postid, toreply) {
  return await http.post(`/comment/add`, {
    content: content,
    post_id: postid,
    to_reply: toreply
  });
}

export async function register(info) {
  return await http.post(`/auth/register`, info);
}

export async function commentList(postid) {
  return await http.get(`/comment/list/${postid}`);
}

export async function getUnitList() {
  return await http.get(`/unit/list`);
}

export async function getUserProfile(userid) {
  return await http.get(`/user/profile/${userid}`);
}

export async function getPostList() {
  return await http.get(`/post/list`, historyPopCache());
}

export async function getPostListByType(type) {
  return await http.get(`/post/list/${type}`, historyPopCache());
}

export async function getPostByUserID(userID) {
  return await http.get(`/post/user/${userID}`);
}

export async function getFavorites() {
  return await http.get(`/post/favorites`, historyPopCache());
}

export async function getPostByID(postid) {
  return await http.get(`/post/view/${postid}`);
}

export async function addPost(post) {
  return await http.post(`/post/add`, post);
}

export async function makeFavorite(id) {
  return await http.get(`/post/favorite/${id}`);
}

export async function deleteFavorite(id) {
  return await http.delete(`/post/favorite/${id}`);
}

export async function getChatRoomByPostID(id) {
  return await http.get(`/chat/create/${id}`);
}

export async function endChat(id) {
  return await http.delete(`/chat/end/${id}`);
}

export async function uploadImage(file) {
  return await http.post('/upload', file, { headers: { 'Content-Type' : 'multipart/form-data' }})
}

export async function follow(id) {
  return await http.get(`/user/follow/${id}`);
}

export async function unfollow(id) {
  return await http.delete(`/user/follow/${id}`);
}

export async function getFollowList(id) {
  return await http.get(`/user/followers/${id}`);
}
export async function reviewAdd(content, point, postID, targetUserID, writerID, chatID) {
  return await http.post(`/review/add`, {
    content: content,
    point: point,
    post_id: postID,
    target_user_id: targetUserID,
    writer_id: writerID,
    chat_id: chatID
  });
}

export async function reviewListPost(userid) {
  return await http.get(`/review/list/post/${userid}`);
}

export async function getReviewByPostID(postID) {
  return await http.get(`/review/post/${postID}`)
}

export async function canWriteReview(chatRoomID) {
  return await http.get(`/chat/canwrite/${chatRoomID}`);
}

export async function getReviews(userID) {
  return await http.get(`/review/list/post/${userID}`);
}

export async function logout() {
  return await http.get(`/auth/logout`);
}