/* rate history */
import React, { useEffect, useState } from "react";
import { reviewListPost } from "api";
import Content from "../post/Content";
import Profile from "../user/Profile";
import Star from "./Stars";

export default function SAHistory({ me, chatRoom }) {
  const [rates, setRates] = useState("");
  const dataUpdate = () => {
    reviewListPost(me.id).then(response => {
      setRates(response.data);
    });
  };
  useEffect(() => {
    dataUpdate();
  }, []);
  return (
    <div className="SAHistory">
      <Content info={chatRoom.post} />
      <div className="comments">
        {rates.map(rate => (
          <Comment
            rate={rate}
            chatRoom={chatRoom}
            participant={rate.writer}
            isSeller={rate.writer.id == chatRoom.post.author.id}
          />
        ))}
      </div>
    </div>
  );
}

function Comment({ rate, chatRoom, participant, isSeller }) {
  return (
    <div className="Comment">
      <Profile userInfo={participant} size={45} />
      <div className="commentName">{participant.name}</div>
      <div className="role">{isSeller ? "판매자" : "구매자"}</div>
      <div className="commentContainer">
        <Star
          rate={rate.point}
          freeze={true}
          id={`${isSeller ? "seller" : "buyer"}${chatRoom.id}`}
        />
        <div className="commentText">{rate.content}</div>
      </div>
    </div>
  );
}
