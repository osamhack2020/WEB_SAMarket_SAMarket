import React from "react";
import Button from "@material-ui/core/Button";
import "./Chat.css";

export default function ChatHeader({ user }) {
  return (
    <div className="chatHead">
      <div className="userTitle">
        <h3 className="userInfo">{user}</h3>
      </div>
      <div className="buttonBox">
        <Button
          // variant="contained"
          variant="raised"
          href="../"
          color="inherit"
        >
          close
        </Button>
      </div>
    </div>
  );
}
