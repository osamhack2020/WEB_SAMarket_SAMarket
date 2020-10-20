/* 스크롤에 반응해 크기가 변화 하는 Component
    Header 와 Profile 에서 합성으로 사용
*/
import React, { useState, useEffect } from "react";

export default function Croucher({ children, norm, stretch, crouched }) {
  /* hook 을 맨 위로 쓸 것, with 정의 순서 고려 */
  const [pageY, setPageY] = useState(
    sessionStorage.getItem("pageY" + stretch) || 0
  );

  const handleScroll = () => {
    const { pageYOffset } = window;
    sessionStorage.setItem("pageY" + stretch, pageYOffset);
    setPageY(pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return <div className={pageY >= norm ? crouched : stretch}>{children}</div>;
}
