/* Main Page 등에서 이루어지는 검색을 다룸 */
import createReducer from "../common/createReducer";

// action type 정의
const CHANGE = "search/CHANGE_KEYWORD";

// action generate 함수
export const changeKeyword = keyword => {
  return { type: CHANGE, keyword };
};

// reducer
export default createReducer(
  { keyword: "" }, // initialState
  {
    [CHANGE]: (state, action) => (state.keyword = action.keyword)
  }
);
