import React from 'react';
import ChatBar from '../components/chat/ChatBar';
import ChatHeader from '../components/chat/ChatHeader';
import PostInfo from '../components/post/PostInfo';

const ChattingPage = (props) => {
    return (
        <div className="ChattingPage">
            <ChatHeader user="" />
            <PostInfo />
            <ChatBar />
        </div>
    );
}
/*
class ChatingPage extends Component {
    render() {
        return (
            <div/>
        );
    }
}
*/
export default ChattingPage
