/* 뒤로가기 버튼, 바로 전 페이지로 돌아감 */
import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import backSvg from "imgs/icons/back.svg";

const BackBtn = ({ history, size, loc }) => {
  // loc: {top, left}
  const BackBtn = styled.button`
    width: ${size ? size[0] : 20}px;
    height: ${size ? size[0] : 20}px;
    background: url(${backSvg});
    background-size: 100%;
    position: absolute;
    top: ${loc ? loc[0] : 22}px;
    left: ${loc ? loc[1] : 10}px;
    z-index: 9999;
  `;
  return <BackBtn className="btn" onClick={e => history.goBack()} />;
};

export default withRouter(BackBtn);
