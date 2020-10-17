import React from "react";
import Button from "@material-ui/core/Button";
import "./Chat.css";
import BackBtn from "../header/BackBtn";

export default function ChatHeader({ title }) {
  return (
    <div className="chatHead">
      <div className="chatTtitle">{title}</div>
      <BackBtn />
    </div>
  );
}
