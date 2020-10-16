/* Container Component 로 redux 를 이용 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNextSAMroad } from "../common/fakeServer";
import { addSAMroad } from "./state";
import InfiniteScroll from "../../views/components/base/InfiniteScroll";
import SAMroadList from "./SAMroadList";

export default function SAMroad() {
  // 강군로드는 무한 스크롤 가능
  const samroads = useSelector(state => state.samroad.samroads);
  const dispatch = useDispatch();
  function onAdd() {
    const samroad = getNextSAMroad();
    dispatch(addSAMroad(samroad));
  }

  return (
    <InfiniteScroll onAdd={onAdd}>
      <SAMroadList samroads={samroads} />
    </InfiniteScroll>
  );
}
