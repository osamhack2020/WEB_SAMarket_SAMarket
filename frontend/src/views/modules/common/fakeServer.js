/* Backend 서버를 대신해 임시로 만든 fakeServer
 API 를 정의함
*/
import { samroads } from "data/samroads.json";
import { users } from "data/users.json";
import { chats, unreadChat } from "data/chats.json";

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

export function getPostInfoUpdater(info, setInfo) {
  return ({ type, title, sub, tags, fontClr, backClr, tagClr, content }) => {
    setInfo({
      postId: info.postId,
      author: info.author,
      type: type !== undefined ? type : info.type,
      contents: {
        title: title !== undefined ? title : info.contents.title,
        sub: sub !== undefined ? sub : info.contents.sub,
        tags: tags !== undefined ? tags : info.contents.tags,
        clr: {
          font: fontClr !== undefined ? fontClr : info.contents.clr.font,
          back: backClr !== undefined ? backClr : info.contents.clr.back,
          tag: tagClr !== undefined ? tagClr : info.contents.clr.tag
        },
        content: content !== undefined ? content : info.contents.content
      }
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
