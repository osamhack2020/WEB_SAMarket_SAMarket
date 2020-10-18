/* Backend 서버를 대신해 임시로 만든 fakeServer
 API 를 정의함
*/
import { samroads } from "data/samroads.json";
import { users } from "data/users.json";

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

export const getChatList = () => {};

export function signInReq(userId, password) {
  const user = users[userId];
  if (user && user.pw === password) {
    console.log(user);
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
