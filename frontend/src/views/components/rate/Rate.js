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
    <div className="Rate">
      <Stars rate={rate} setRate={setRate} />
      <input className="commentInput" placeholder="한줄평을 적어주세요." />
    </div>
  );
}
