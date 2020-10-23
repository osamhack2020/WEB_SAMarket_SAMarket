/* rate history */
import React from "react";
import {
  getPostById,
  getRateByChatRoomId,
  getEmptyPost
} from "views/modules/common/fakeServer";
import Content from "../post/Content";
import Profile from "../user/Profile";
import Star from "./Stars";

export default function SAHistory({ user, chatRoomId }) {
  const rateInfo = getRateByChatRoomId(chatRoomId);
  const postInfo =
    chatRoomId < 0
      ? getEmptyPost(user, "세상에!", "거래내역이 없습니다..")
      : getPostById(rateInfo.postId);
  const noParticipant = {
    id: "",
    name: "",
    rate: 0,
    comment: ""
  };

  return (
    <div className="SAHistory">
      <Content info={postInfo} />
      <div className="comments">
        <Comment
          chatRoomId={chatRoomId}
          participant={rateInfo ? rateInfo.seller : noParticipant}
          isSeller={true}
        />
        <Comment
          chatRoomId={chatRoomId}
          participant={rateInfo ? rateInfo.buyer : noParticipant}
          isSeller={false}
        />
      </div>
    </div>
  );
}

function Comment({ chatRoomId, participant, isSeller }) {
  return (
    <div className="Comment">
      <Profile userInfo={participant} size={45} />
      <div className="commentName">{participant.name}</div>
      <div className="role">{isSeller ? "판매자" : "구매자"}</div>
      <div className="commentContainer">
        <Star
          rate={participant.rate}
          freeze={true}
          id={`${isSeller ? "seller" : "buyer"}${chatRoomId}`}
        />
        <div className="commentText">{participant.comment}</div>
      </div>
    </div>
  );
}
