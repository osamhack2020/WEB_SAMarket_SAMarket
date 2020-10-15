import React from 'react';
import Button from "@material-ui/core/Button";
import './Chat.css';

const Input = () => (
    <div className="inputContainer">
        <input
            className="input"
            type="text"
            placeholder="메세지를 입력하세요"
            value={message}
        />
        <Button
            variant="contained"
            className="inputButton"
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