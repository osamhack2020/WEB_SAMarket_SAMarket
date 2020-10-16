/* Backend 서버를 대신해 임시로 만든 fakeServer
 API 를 정의함
*/
import { samroads } from "../../../data/samroads.json";
import { users } from "../../../data/users.json";

function MakeDataGenerator(items) {
  let itemIdx = 0;
  return function getNextData() {
    const item = items[itemIdx % items.length];
    itemIdx += 1;
    return { ...item, itemId: itemIdx };
  };
}

export const getNextSAMroad = MakeDataGenerator(samroads);

export function signIn({ userId, password }) {
  const user = users[userId];
  if (user && user.pw === password) {
    return user;
  }
  throw new Error("Sign In failed");
}
