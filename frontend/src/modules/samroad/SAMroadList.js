/* Container 가 아닌 presentational component */
import React from "react";
import Post from "../../views/components/post/Post";

export default function SAMroadList({ samroads }) {
  return (
    <ul>
      {samroads.map(samroad => (
        <Post info={samroad} />
      ))}
    </ul>
  );
}
