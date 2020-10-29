import React, { useEffect, useState } from "react";
import Profile from "../user/Profile";
import HorizontalScroller from "views/components/base/HorizontalScroller";
import Slider from "react-slick";
import { getFollowList } from "api";

export default function FriendList({ user }) {

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFollowList(user.id).then(response => {
      setFriends(response.data);
    });
  }, [user]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6
  };

  return (
    <div>
      <div class="section-header">{user.name}의 전우들</div>
      <Slider {...settings}>
        {friends.map(friend => (
          <Friend key={friend.id} userInfo={friend} />
        ))}
      </Slider>
      {friends.length === 0 && (
        <div className="emptyFriend">아직 전우가 없어요</div>
      )}
    </div>
  );
}

function Friend({ userInfo }) {
  return (
    <div className="Friend">
      <Profile userInfo={userInfo} size={50} />
      <div className="friendName">{userInfo.name}</div>
    </div>
  );
}
