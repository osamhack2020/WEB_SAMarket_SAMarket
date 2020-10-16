/* immer 를 이용해 불변 객체를 활용하는 reducer 반환 */
import produce from "immer";

export default function createReducer(initialState, handleMap) {
  return function (state = initialState, action) {
    return produce(state, draft => {
      const handler = handleMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}
