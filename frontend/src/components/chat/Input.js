import React from 'react';
import Button from "@material-ui/core/Button";
import './Chat.css';

const Input = ({ message, setMessage, sendMessage }) => (
    <div className="inputContainer">
        <input
            className="input"
            type="text"
            placeholder="메세지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <Button
            variant="contained"
            className="inputButton"
            onClick={(e) => sendMessage(e)}
        >
            전송
        </Button>
    </div>
);
/*
class Input extends Component {
    render() {
        return (
            <div className='Input'/>
        );
    }
}
*/
export default Input