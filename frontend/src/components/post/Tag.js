/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from 'react'
import './Post.css';


const Tag = (props) => {
    const { clr, text, onSearch } = props;
    // 기본 값을 할당하는 과정
    const color = {font: '#FDFEFF', tag: '#505560', ...clr}

    const tagStyle = {
        color: color.font, background: color.tag,
        border: '0px solid', outline: 0,
        height: '25px', borderRadius: '12.5px',
        width: String(40 + 15*text.length) + 'px',

        margin: '5px 5px 5px 5px',
        paddingBottom: '3px'
    }
    const tagClick = () => {
        onSearch({keyword:text})
    }

    return (
        <button style={tagStyle} onClick={tagClick}>
            # {text}
        </button>
    )
}

export default Tag