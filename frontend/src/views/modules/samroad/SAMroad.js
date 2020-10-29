/* Container Component 로 redux 를 이용 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNextSAMroad } from "../common/fakeServer";
import { addSAMroad } from "./state";
import InfiniteScroll from "views/components/base/InfiniteScroll";
import SAMroadList from "./SAMroadList";
import { getPostList, getPostListByType } from "api";

export default function SAMroad({ type }) {
  // 강군로드는 무한 스크롤 가능
  // state.{reducer 등록 이름}.{사용하고자 하는 attribute}
  /*
  const samroads = useSelector(state => state.samroad.samroads);
  const dispatch = useDispatch();
  function onAdd(e) {
    if (e) e.preventDefault(); // 리로딩 방지
    const samroad = getNextSAMroad();
    dispatch(addSAMroad(samroad));
  }

  return (
    <InfiniteScroll onAdd={onAdd} offSet={5}>
      <SAMroadList samroads={samroads} />
    </InfiniteScroll>
  );
  */
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getPostListByType(type).then(response => {
      setPostList(response.data);
    })
  }, [type]);

  return <SAMroadList samroads={postList} />;
}
