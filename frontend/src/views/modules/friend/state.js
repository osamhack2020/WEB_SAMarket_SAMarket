/* 친구 목록을 관리하는 리듀서 로직 */
import createItemsLogic from "../common/createItemsLogic";

const { add, remove, edit, reducer } = createItemsLogic("friend");
export const addFriend = add;
export const removeFriend = remove;
export const editFriend = edit;
export default reducer;
