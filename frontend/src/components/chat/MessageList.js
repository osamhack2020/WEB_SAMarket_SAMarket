import React from 'react';
import Message from "./Message";
import './Chat.css';

const MessageList = ({ messages, name }) => {
    return (
        <div className='MessagList'>
            {messages.map((message, i) => (
                <div key={i}>
                    <Message message={message} name={name} />
                </div>
            ))}
        </div>
    );
}
/*
class MessageList extends Component {
    render() {
        return (
            <div className='MessageList'/>
        );
    }
}
*/
export default MessageList