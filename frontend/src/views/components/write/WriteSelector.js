import React from "react";

export function TypeSelector({ info, updateInfo }) {
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

export function ClrSelector({ info, updateInfo }) {
  const clrs = ["back", "tag", "font"];
  const selectClr = e =>
    updateInfo({ [e.target.name + "Clr"]: e.target.value });
  return (
    <div className="clrSelector">
      {clrs.map((clr, idx) => (
        <div className="clrContainer">
          {["배경", "태그", "글씨"][idx]}
          <input
            className="btn clrInput"
            type="color"
            value={info.contents.clr[clr]}
            onChange={selectClr}
            name={clr}
          />
        </div>
      ))}
    </div>
  );
}
