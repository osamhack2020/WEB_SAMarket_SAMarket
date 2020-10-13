/* Main Page 등에서 이루어지는 검색을 다룸 */

// action type 정의
const CHANGE_KEYWORD = "search/CHANGE_KEYWORD";

// action generate 함수
export const chageKeyword = keyword => ({
  type: CHANGE_KEYWORD,
  keyword: keyword
});

// initial state 정의
const initialState = {
  keyword: ""
};

// reducer 정의
export default function search(state = initialState, action) {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return {
        ...state,
        keyword: action.keyword
      };
    default:
      return state;
  }
}
