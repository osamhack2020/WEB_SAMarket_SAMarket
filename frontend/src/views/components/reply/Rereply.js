import React from "react";
import Profile from "../user/Profile";
import "./Reply.css";

export default function Reply({ message: { text, sender }, date="10/22", time="09:45" }) {
    return (
        <div
            className="replyContainer rereply"
        >
            <div>
                <Profile userInfo={sender} size={30} />
                <p className="senderName">{sender.name}</p>
            </div>
            <div className="replyBox">
                <div className="replyText">{text}</div>
                <div className="replyFooter">
                    <div className="replyDate"> {date} {time} </div>
                </div>
            </div>
        </div>
    );
}