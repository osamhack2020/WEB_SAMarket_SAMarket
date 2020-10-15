import React from 'react';
import './Chat.css';

// Material-ui
import Paper from "@material-ui/core/Paper";

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    } 
    return isSentByCurrentUser ? (<div className="messageContainer end">
        <Paper className="messageBox backgroundBlue">
            <p className="messageText blue">{text}</p>
        </Paper>
        <p className="sentMessage pl-10">{trimmedName}</p>
    </div>)
        :
        (<div className="messageContainer start">
            <p className="sentMessage pr-10">{user}</p>
            <Paper className="messageBox backgroundLight">
                <p className="messageText black">{text}</p>
            </Paper>
        </div>
        );
};
/*
class Message extends Component {
    render() {
        return (
            <div className='Message'/>
        );
    }
}
*/
export default Message