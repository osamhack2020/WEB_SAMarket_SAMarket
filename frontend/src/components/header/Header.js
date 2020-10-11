/* Main Page 에서 최상단에 위치하는 Component
  스크롤에 반응해 크기가 변화
*/
import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import Profile from "../profile/Profile";
import "./Header.css";

export default function Header({ onSearch }) {
  /* hook 을 맨 위로 쓸 것, with 정의 순서 고려 */
  const [pageY, setPageY] = useState(0);
  const documentRef = useRef(document);

  const handleScroll = () => {
    const { pageYOffset } = window;
    setPageY(pageYOffset);
  };

  useEffect(() => {
    documentRef.current.addEventListener("scroll", handleScroll);
    return () =>
      documentRef.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return (
    <div className={pageY <= 200 ? "head" : "crouch"}>
      <Profile />
      <SearchBar onChange={onSearch} />
    </div>
  );
}
