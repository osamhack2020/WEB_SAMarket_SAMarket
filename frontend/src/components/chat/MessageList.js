import React from 'react';
import Message from "./Message";
import './Chat.css';

const MessageList = ({ messages, name }) => {
    return (
        <div className='MessagList'>
            {/* 더미 데이터 */}
            <Message message = {{ text:"안녕하세요!", user:"서형진" }} name= {"고현수"} />
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