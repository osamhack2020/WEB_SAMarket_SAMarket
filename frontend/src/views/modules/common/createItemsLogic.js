/* name 의 추가, 삭제, 변경 action 을 관리하는 로직 */
import createReducer from "./createReducer";

export default function createItemsLogic(name) {
  const ADD = `${name}/ADD`;
  const REMOVE = `${name}/REMOVE`;
  const EDIT = `${name}/EDIT`;

  const add = item => ({ type: ADD, item });
  const remove = item => ({ type: REMOVE, item });
  const edit = item => ({ type: EDIT, item });

  const reducer = createReducer(
    { [name]: [] },
    {
      [ADD]: (state, action) => state[name].push(action.item),
      [REMOVE]: (state, action) => {
        const idx = state[name].findIndex(item => item.id === action.item.id);
        state[name].splice(idx, 1);
      },
      [EDIT]: (state, action) => {
        const idx = state[name].findIndex(item => item.id === action.item.id);
        if (idx >= 0) state[name][idx] = action.item;
      }
    }
  );

  return { add, remove, edit, reducer };
}
