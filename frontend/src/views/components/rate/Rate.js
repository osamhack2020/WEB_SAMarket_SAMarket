import React, { useState, useEffect } from "react";
import { reviewListPost, reviewAdd } from "api";
import Stars from "./Stars";

export default function Rate({ me, chatRoom }) {
  const [rate, setRate] = useState(10);
  const [comment, setComment] = useState("");
  const seller = chatRoom.post.author;
  const submitRate = (e) => {
    e.preventDefault();
    reviewAdd(comment, rate, chatRoom.post_id, me.id, seller.id).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <form className="Rate" onSubmit={submitRate}>
      <div className="rateTitle">{`${
        chatRoom.post.author.id === me.id ? "판매자" : "구매자"
      }의 평가`}</div>
      <Stars rate={rate} setRate={setRate} />
      <input
        className="commentInput"
        placeholder="한줄평을 적어주세요."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button className="btn commentBtn">평가 완료하기</button>
    </form>
  );
}
