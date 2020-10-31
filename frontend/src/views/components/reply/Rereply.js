import React from "react";
import Profile from "../user/Profile";
import "./Reply.css";
import Moment from 'react-moment';

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
                    <div className="replyDate"> <Moment format="MM/DD HH:mm">{reply.created_at}</Moment> </div>
                </div>
            </div>
        </div>
    );
}