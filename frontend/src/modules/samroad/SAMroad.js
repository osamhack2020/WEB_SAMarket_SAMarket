/* Container Component 로 redux 를 이용 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNextSAMroad } from "../common/fakeServer";
import { addSAMroad } from "./state";
import SAMroadList from "./SAMroadList";

export default function SAMroad() {
  const [hitBottom, setHitBottom] = useState(true);
  const samroads = useSelector(state => state.samroad.samroads);
  const dispatch = useDispatch();
  function onAdd() {
    const samroad = getNextSAMroad();
    dispatch(addSAMroad(samroad));
  }

  useEffect(() => {
    setHitBottom(false);
    onAdd();
  }, [hitBottom]);

  const onScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      onAdd();
      setHitBottom(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div>
      <SAMroadList samroads={samroads} />
    </div>
  );
}
