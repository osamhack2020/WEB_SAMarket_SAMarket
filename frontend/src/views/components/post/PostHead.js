/* 게시글의 상단 부분 Component
 게시글 유형에 따라 세 번째 버튼이 다르고 (구매/관심없음)
 게시글을 쓴 유저의 정보를 요약해서 보여줌
*/
import React, { useState } from "react";
import { useSelector } from "react-redux";
import User from "../user/User";
import "./Post.css";
import { customHistory } from "index";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  getChatRoomByPostID,
  setPostUpdated,
  deleteFavorite,
  makeFavorite
} from "api";
import { toast } from "react-toastify";

const svgs = (() => {
  let svgs = {};
  let imgSrcs = ["share", "like", "liked", "buy", "deny"];
  for (let idx in imgSrcs) {
    svgs[imgSrcs[idx]] = require("imgs/icons/" + imgSrcs[idx] + ".svg");
  }
  return svgs;
})();

const likeMap = Object();

export default function PostHead({ info, history, hideBtn }) {
  const [isFavorite, setIsFavorite] = useState(
    likeMap[info.id] || info.is_favorite
  );

  const getBtn = idx => {
    const img = {
      0: "share",
      1: isFavorite ? "liked" : "like",
      2: info.type === "sell" ? "buy" : "deny"
    }[idx];
    return {
      marginRight: "5%",
      right: 73 - 35 * idx,
      background: "url(" + svgs[img] + ")"
    };
  };

  const url = `${window.location.host}/post/${info.id}`;

  const btnAction = idx => {
    /* 순서대로 공유, 좋아요, 구매/관심없음 */
    return () => {
      if (idx == 0) {
        navigator.clipboard.writeText("hello");
      } else if (idx === 1) {
        /* TODO: Backend 에 알려서, likes 바꿔야 함 */
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
          makeFavorite(info.id).then(response => {
            likeMap[info.id] = true;
          });
        } else {
          deleteFavorite(info.id).then(response => {
            likeMap[info.id] = false;
          });
        }
      }
      if (idx == 2) {
        if (info.type == "sell") {
          getChatRoomByPostID(info.id).then(response => {
            customHistory.push(`/chat/${response.data.id}`);
          });
        }
      }
    };
  };

  return (
    <div className="postHead">
      <User userInfo={info.author} />
      {!(hideBtn == true) && (
        <div>
          <CopyToClipboard text={url} onCopy={() => toast('링크가 복사되었습니다.')}>
            <button
              className="btn postHeadBtn"
              style={getBtn(0)}
            ></button>
          </CopyToClipboard>
          <button
            className="btn postHeadBtn"
            style={getBtn(1)}
            onClick={btnAction(1)}
          ></button>
          <button
            className="btn postHeadBtn"
            style={getBtn(2)}
            onClick={btnAction(2)}
          ></button>
        </div>
      )}
    </div>
  );
}
