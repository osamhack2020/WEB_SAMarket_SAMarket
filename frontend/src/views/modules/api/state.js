/* API로부터 데이터 요청 시 동작 */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import createReducer from "../common/createReducer";

// action type 정의
const LOADING = "api/LOADING_DATA";
const SUCCESS = "api/SUCCESS_DATA";
const ERROR = "api/ERROR_DATA";

// action generate 함수
export const loadingData = loading => ({ type: LOADING, loading });
export const successData = data => ({ type: SUCCESS, data });
export const errorData = error => ({ type: ERROR, error });

// reducer
export default createReducer(
  { loading: false, data: null, error: null }, // initialState
  {
    [LOADING]: (state, _) => { state.loading = true; },
    [SUCCESS]: (state, action) => { state.loading = false; state.data = action.data; },
    [ERROR]: (state, action) => { state.loading = false; state.error = action.error; console.log(state); console.log(action); }
  }
);

// 커스텀 Hook
export function useAsync(callback) {
  const dispatch = useDispatch();
  // callback에는 api 통신관련 함수가 들어감.
  const fetchData = useCallback(async () => {
    dispatch(loadingData());
    try {
      const data = await callback();
      dispatch(successData(data));
    } catch (e) {
      console.log(e);
      dispatch(errorData(e));
    }
  }, [callback]);
  const api = useSelector(state => state.api);
  return [api, fetchData];
}