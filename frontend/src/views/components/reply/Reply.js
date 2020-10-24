import React, { Fragment } from "react";
import Profile from "../user/Profile";
import Rereply from "./Rereply.js";
import "./Reply.css";
import { getChatRoom } from "views/modules/common/fakeServer";
const roomInfo = getChatRoom('0');
const { postId, members, msgs } = roomInfo;

export default function Reply({ message: { text, sender }, date, time, inputFocus }) {
    return (
        <Fragment>
            <div
                className="replyContainer"
            >
                <div>
                    <Profile userInfo={sender} size={30} />
                    <p className="senderName">{sender.name}</p>
                </div>
                <div className="replyBox">
                    <div className="replyText">{text}</div>
                    <div className="replyFooter">
                        <div className="replyDate"> {date} {time} </div>
                        <div onClick={inputFocus} className="replyButton"><div className="heartIcon"></div><div>답글달기</div></div>
                    </div>
                </div>
            </div>
            {msgs.map((message, i) => (
                <div key={i}>
                    <Rereply message={message} />
                </div>
            ))}
        </Fragment>
    );
}

