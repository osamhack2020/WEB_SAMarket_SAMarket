/* 여러 개의 reducer 를 합치는 함수 */
export default function mergeReducers(reducers) {
  return function (state, action) {
    if (!state) {
      // 초기 상태값 계산: 모든 리듀서 함수의 결과를 합침 (acc: accumulate)
      return reducers.reduce((acc, r) => ({ ...acc, ...r(state, action) }), {});
    } else {
      let nextState = state; // 현재 상태에서 시작
      for (const reducer of reducers) {
        nextState = reducer(nextState, action);
      }
      return nextState;
    }
  };
}
