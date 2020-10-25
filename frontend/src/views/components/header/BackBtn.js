/* 뒤로가기 버튼, 바로 전 페이지로 돌아감 */
import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import backSvg from "imgs/icons/back.svg";

const BackBtnStyled = styled.button`
  width: ${props => props.size ? props.size[0] : 20}px;
  height: ${props => props.size ? props.size[0] : 20}px;
  background: url(${backSvg});
  background-size: 100%;
  position: ${props => props.fixed ? "fixed" : "absolute"};
  top: ${props => props.loc ? props.loc[0] : 22}px;
  left: ${props => props.loc ? props.loc[1] : 10}px;
  z-index: 9999;
`;

const BackBtn = ({ history, size, loc, fixed }) => {
  // loc: {top, left}
  return <BackBtnStyled size={size} loc={loc} fixed={fixed} className="btn" onClick={e => history.goBack()} />;
};

export default withRouter(BackBtn);
