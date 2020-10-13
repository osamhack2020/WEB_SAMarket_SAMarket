/* 정의된 reducer 들을 내보냄 */
import { combineReducers } from "redux";
import search from "./search";

export default combineReducers({
  // 다른 reducer 정의 시, 여기에 추가
  search
});
