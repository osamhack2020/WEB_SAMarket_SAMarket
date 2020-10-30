/* Backend 서버를 대신해 임시로 만든 fakeServer
 API 를 정의함
*/
import { samroads } from "data/samroads.json";
import { users } from "data/users.json";
import { chats, unreadChat } from "data/chats.json";
import { rates } from "data/rates.json";

function MakeDataGenerator(items) {
  let itemIdx = 0;
  return function getNextData() {
    const item = items[itemIdx % items.length];
    itemIdx += 1;
    return { ...item, itemId: itemIdx };
  };
}

export const getNextSAMroad = MakeDataGenerator(samroads);
export const getPostById = postId =>
  samroads.filter(samroad => samroad.postId === parseInt(postId))[0];

export const getWhosePosts = userId =>
  samroads.filter(samroad => samroad.author.id === userId);

export const getLieks = userId => {
  const likes = users[userId].likes;
  console.log(likes);
  return samroads.filter(samroad => likes.indexOf(samroad.postId) > -1);
};

const getNextPostId = () => samroads.length; // identical 한 걸 주는 logic 필요
export const getInitialPostInfo = userInfo => ({
  postId: getNextPostId(),
  author: { id: userInfo.id, name: userInfo.name },
  type: "post",
  contents: {
    title: undefined,
    sub: undefined,
    tags: [],
    clr: { font: "#202326", back: "#8990A0", tag: "#505560" },
    content: ""
  }
});
export const getEmptyPost = (user, title, sub) => {
  return {
    postId: -1,
    author: user,
    type: "post",
    contents: {
      title: title,
      sub: sub,
      tags: ["처음", "기다려요"],
      clr: {}
    }
  };
};

export const getRateByChatRoomId = chatRoomId => rates[chatRoomId];

export function getPostInfoUpdater(info, setInfo) {
  console.log(info);
  return ({ type, title, sub, tags, fontClr, backClr, tagClr, content }) => {
    setInfo({
      type: type !== undefined ? type : info.type,
      title: title !== undefined ? title : info.title,
      sub: sub !== undefined ? sub : info.sub,
      tags: tags !== undefined ? tags : info.tags,
      clr: {
        font: fontClr !== undefined ? fontClr : info.clr.font,
        back: backClr !== undefined ? backClr : info.clr.back,
        tag: tagClr !== undefined ? tagClr : info.clr.tag
      },
      content: content !== undefined ? content : info.content
    });
  };
}

export const getChatList = () => chats;
export const getChatRoom = chatRoomId => {
  for (let idx in chats) {
    if (chats[idx].chatRoomId === chatRoomId) return chats[chatRoomId];
  }
  return {};
};
export const getUnreadChat = () => unreadChat;

export function signInReq(userId, password) {
  const user = users[userId];
  if (user && user.pw === password) {
    return user;
  }
  throw new Error("Sign In Failed");
}

export function signUpReq({ userId, userInfo }) {
  if (!(userId in users)) {
    users[userId] = userInfo; // 이걸 body에 실어서 보냄
    // post request 처리 결과를 받아서 return
    return userInfo;
  }
  throw new Error("Sign Up Failed");
}

export function getUserById(id) {
  if (id in users) return users[id];
  throw new Error("Wrong User ID");
}
