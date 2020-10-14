/* Container 가 아닌 presentational component */
import React from "react";

export default function SAMroadList({ samroads }) {
  return (
    <ul>
      {samroads.map(samroad => (
        <li key={samroad.postId}>{samroad.contents.title}</li>
      ))}
    </ul>
  );
}
