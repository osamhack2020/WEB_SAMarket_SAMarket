/* 강군로드에 올라오는 게시물 들을 나타내는 로직
무한 스크롤을 지원하기 위한 로직이 포함됨
*/
import createReducer from "../common/createReducer";
import createItemsLogic from "../common/createItemsLogic";
import mergeReducers from "../common/mergeReducers";

const { add, remove, edit, reducer: samroadReducer } = createItemsLogic(
  "samroads"
);

const INCREASE_NEXT_PAGE = "samroad/INCREASE_NEXT_PAGE";

export const addSAMroad = add;
export const removeSAMroad = remove;
export const editSAMroad = edit;
export const increaseNextPage = () => ({ type: INCREASE_NEXT_PAGE });

const INITIAL_STATE = { nextPage: 0 };
const reducer = createReducer(INITIAL_STATE, {
  [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1)
});
const reducers = [reducer, samroadReducer];
export default mergeReducers(reducers);
