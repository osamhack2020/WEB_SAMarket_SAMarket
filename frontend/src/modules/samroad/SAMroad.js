/* Container Component 로 redux 를 이용 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNextSAMroad } from "../common/fakeServer";
import { addSAMroad } from "./state";
import SAMroadList from "./SAMroadList";

export default function SAMroad() {
  const samroads = useSelector(state => state.samroad.samroads);
  const dispatch = useDispatch();

  function onAdd() {
    const samroad = getNextSAMroad();
    dispatch(addSAMroad(samroad));
  }
  return (
    <div>
      <button onClick={onAdd}>강군로드 추가</button>
      <SAMroadList samroads={samroads} />
    </div>
  );
}
