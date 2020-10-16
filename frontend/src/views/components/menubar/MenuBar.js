/* 하단에 고정되어 있는 메뉴바
4개의 버튼은 메인페이지 내에서 게시글의 유형을 필터링
  (전체, sell, post, adv 순)
작성 버튼은 게시물 작성 페이지로 이동
*/
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./MenuBar.css";

const imgs = { 0: "home", 1: "shop", 2: "post", 3: "adv" };
const svgs = (() => {
  // 미리 svg 파일을 로드
  let svgs = {};
  for (let idx in imgs) {
    let img = imgs[idx];
    svgs[img] = require("imgs/icons/" + img + ".svg");
    svgs[img + "Click"] = require("imgs/icons/" + img + "Click.svg");
  }
  return svgs;
})();

export default function MenuBar() {
  const [clicked, setClick] = useState(0);
  const getBtnImg = idx => {
    /* 각 버튼 별로 이미지를 적용함 */
    const img = imgs[idx] + (clicked === idx ? "Click" : "");
    return {
      background: "url(" + svgs[img] + ") no-repeat center"
    };
  };

  const switchPage = idx => {
    return () => {
      //TODO: 해당 유형의 post 만 filter
      setClick(idx);
    };
  };

  return (
    <div className="menuBar">
      {[0, 1, 2, 3].map(idx => (
        <button /* 하단 4개의 버튼을 순서대로 생성 */
          className="barBtn"
          style={getBtnImg(idx)}
          onClick={switchPage(idx)}
        />
      ))}
      <Link to="/write" className="writeBtn" />
    </div>
  );
}
