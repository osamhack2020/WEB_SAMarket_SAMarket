import React, { Fragment } from "react";
import Profile from "../user/Profile";
import Rereply from "./Rereply.js";
import "./Reply.css";
import { getChatRoom } from "views/modules/common/fakeServer";
const roomInfo = getChatRoom('0');
const { postId, members, msgs } = roomInfo;

export default function Reply({ message: { text, sender }, date="10/22", time="09:45", inputFocus }) {
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
            <Rereply message={{text, sender}} inputFocus={inputFocus} />
        </Fragment>
    );
}

