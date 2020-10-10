/* 현재 사용하고 있는 유저가 아닌 다른 유저 */
import React from 'react'
import './User.css';


const User = (props) => {
    const { name, id } = props.userInfo;

    return (
        <div className='user'>
            <div className='userImg'/>
            <div className='name'>
                {name} @{id}
            </div>
        </div>
    )
}

export default User