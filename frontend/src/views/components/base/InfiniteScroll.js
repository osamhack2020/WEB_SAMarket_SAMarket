/* 페이지 하단에 도달할 시, onAdd 를 호출해 무한 스크롤이 가능한 Component */
import React, { useState, useEffect } from "react";

export default function InfiniteScroll({ onAdd, offSet = 1, children }) {
  // 처음에는 하단에 도달했다고 가정,
  const [hitBottom, setHitBottom] = useState(true);
  // 초기 값이 True 이므로 맨 처음 페이지 진입시에도 Item 이 Add 됨
  useEffect(() => {
    setHitBottom(false);
    for (let _ = 0; _ < offSet; _++) onAdd();
  }, [hitBottom]);

  // scroll 위치를 감지
  const onScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      for (let _ = 0; _ < offSet; _++) onAdd();
      setHitBottom(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div>{children}</div>;
}
