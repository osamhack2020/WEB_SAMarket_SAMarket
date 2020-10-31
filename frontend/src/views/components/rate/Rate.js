import React, { useState, useEffect } from "react";
import { reviewListPost, reviewAdd } from "api";
import { useSelector } from "react-redux";
import Stars from "./Stars";
import { canWriteReview } from "api";
export default function Rate({ chatRoom, st }) {
  const [rate, setRate] = useState(10);
  const [comment, setComment] = useState("");
  const seller = chatRoom.post.author;

  useEffect(() => {
    if (chatRoom.id)
      canWriteReview(chatRoom.id).then(response => {
        if (response.data && response.data.okay == false) {
          st.setStatus(3);
        }
      });
  }, []);

  const me = useSelector(state => state.sign.userInfo);
  if (!chatRoom) return null;

  let opp;
  if (chatRoom && chatRoom.members)
    opp =
      me.id == chatRoom.members[0].id
        ? chatRoom.members[1].id
        : chatRoom.members[0].id;
  const submitRate = e => {
    // call the api to submit rate & comment
    e.preventDefault();
    st.setStatus(3);
    reviewAdd(
      comment,
      rate,
      chatRoom.post_id,
      opp,
      me.id,
      chatRoom.id
    ).then(response => {});
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
