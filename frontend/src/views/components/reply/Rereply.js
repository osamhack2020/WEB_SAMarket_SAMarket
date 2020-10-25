import React from "react";
import Profile from "../user/Profile";
import "./Reply.css";

export default function Reply({ message: { reply } }) {
    return (
        <div
            className="replyContainer rereply"
        >
            <div>
                <Profile userInfo={reply.user} size={30} />
                <p className="senderName">{reply.user.name}</p>
            </div>
            <div className="replyBox">
                <div className="replyText">{reply.content}</div>
                <div className="replyFooter">
                    <div className="replyDate"> {reply.createdAt.format('MM/dd')} {reply.createdAt.format('HH:mm')} </div>
                </div>
            </div>
        </div>
    );
}