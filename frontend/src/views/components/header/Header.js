/* Main Page 에서 최상단에 위치하는 Component
  스크롤에 반응해 크기가 변화
*/
import React from "react";
import { useDispatch } from "react-redux";
import { changeKeyword } from "views/modules/search/state";
import Croucher from "../base/Croucher";
import TopLinks from "./TopLinks";
import Me from "../me/Me";
import SearchBar from "./SearchBar";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();
  const onSearch = keyword => dispatch(changeKeyword(keyword));
  return (
    <Croucher norm={200} stretch="head" crouched="crouch">
      <TopLinks />
      <Me />
      <SearchBar onSearch={onSearch} />
    </Croucher>
  );
}
