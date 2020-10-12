/* Main Page 에서 최상단에 위치하는 Component
  스크롤에 반응해 크기가 변화
*/
import React from "react";
import Croucher from "../base/Croucher";
import TopLinks from "./TopLinks";
import Profile from "../profile/Profile";
import SearchBar from "./SearchBar";
import "./Header.css";

export default function Header({ onSearch }) {
  return (
    <Croucher norm={200} stretch="head" crouched="crouch">
      <Profile onSearch={onSearch} />
      <SearchBar onSearch={onSearch} />
      <TopLinks />
    </Croucher>
  );
}
