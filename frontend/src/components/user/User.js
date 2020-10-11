/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from 'react'
import './User.css';


const User = (props) => {
    const { name, id } = props.userInfo;
    let profileImg;
    try { // 사용자 이미지가 있는지 확인
        profileImg = require('../../imgs/users/' +id+ '.png')
    } //  없으면 기본 이미지로
    catch {
        profileImg = require('../../imgs/icons/user.png')
    }
    const userImg = {
        outline: '0',
        border: '0px solid', borderRadius: '17.5px',
        background: '#F0F3F6',
        position: 'absolute',
        left: '20px', top: '15px',
        width: '35px', height: '35px',
        backgroundImage: "url(" + profileImg + ")",
        backgroundSize: '35px 35px',
    }

    const switchProfile = () => {
        /* user profile page 로 이동 */
    }

    return (
        <div className='user'>
            <button
                style={userImg}
                onClick={switchProfile}/>
            <div className='userName'>@{id}</div>
        </div>
    )
}

export default User