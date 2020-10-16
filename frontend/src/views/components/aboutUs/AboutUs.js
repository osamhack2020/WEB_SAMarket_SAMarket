/* 페이지 최하단에서 강군마켓 소개, 도움말, 문의 링크를 보여주는 역할
 */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./AboutUs.css";

export default function AboutUs() {
  const AboutLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    margin-right: 15px;
    color: #8990a0;
  `;

  return (
    <div className="aboutUs">
      <AboutLink to="/aboutus/intro">강군마켓 소개</AboutLink>
      <AboutLink to="/aboutus/help">도움말</AboutLink>
      <AboutLink to="/aboutus/contact">문의</AboutLink>
      ©2020 SAMARKET
    </div>
  );
}
