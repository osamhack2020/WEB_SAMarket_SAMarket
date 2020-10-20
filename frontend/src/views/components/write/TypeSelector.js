import React, { useState } from "react";

export default function TypeSelector({ info, updateInfo }) {
  const selectType = e => {
    updateInfo({
      type: e.target.name,
      sub: e.target.name === "sell" ? "" : info.contents.sub
    });
  };
  const types = [
    ["post", "일반"],
    ["adv", "광고"],
    ["sell", "판매"]
  ];

  return (
    <div className="typeSelector">
      {types.map((type, idx) => (
        <button
          className={`btn typeBtn ${
            type[0] === info.type ? "selectedType" : ""
          } ${["leftT", "centerT", "rightT"][idx]}`}
          onClick={selectType}
          type="button"
          name={type[0]}
        >
          {type[1]}
        </button>
      ))}
    </div>
  );
}
