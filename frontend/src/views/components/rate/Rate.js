import React, { useState } from "react";
import {
  getPostById,
  getRateByChatRoomId
} from "views/modules/common/fakeServer";
import Stars from "./Stars";

export default function Rate({ me, chatRoomId }) {
  const [rate, setRate] = useState(10);
  const rateInfo = getRateByChatRoomId(chatRoomId);
  const seller = getPostById(rateInfo.postId).author;

  console.log(seller);
  return (
    <form className="Rate">
      <div className="rateTitle">{`${
        seller.id === me.id ? "판매자" : "구매자"
      }의 평가`}</div>
      <Stars rate={rate} setRate={setRate} />
      <input className="commentInput" placeholder="한줄평을 적어주세요." />
      <button className="btn commentBtn">거래 완료하기</button>
    </form>
  );
}
