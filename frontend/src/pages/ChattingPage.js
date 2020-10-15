import React from 'react';
import ChatBar from '../components/chat/ChatBar';
import ChatHeader from '../components/chat/ChatHeader';
import PostInfo from '../components/post/PostInfo';

const ChattingPage = (props) => {
    return (
        <div className="ChattingPage">
            <ChatHeader /* 더미 데이터 "서형진" */ user="서형진" />
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
