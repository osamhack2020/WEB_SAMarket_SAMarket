import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stars from "./Stars";

export default function Rate({ chatRoom, st }) {
  const [rate, setRate] = useState(10);
  const [comment, setComment] = useState("");
  const seller = chatRoom.post.author;
  const me = useSelector(state => state.sign.userInfo);

  const submitRate = () => {
    // call the api to submit rate & comment
    st.setStatus(3);
  };

  return (
    <form className="Rate" onSubmit={submitRate}>
      <div className="rateTitle">{`${
        seller.id === me.id ? "판매자" : "구매자"
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
