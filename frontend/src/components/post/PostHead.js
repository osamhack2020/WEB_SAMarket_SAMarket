import React, { Component } from 'react';
import Profile from '../../data/user/profile.json'
import User from '../user/User';
import './Post.css';

class PostHead extends Component {
    state = {
        liked: Profile.likes.indexOf(this.props.post_id) >= 0
    }

    getBtn = (idx, type) => {
        const img = {
            0: 'share',
            1: this.state.liked? 'liked' :'like',
            2: type === 'sell'? 'buy' :'deny'}[idx]

        return ({
            border: 0, outline: 0, cursor: 'pointer',
            background: 'rgba(0,0,0,0)',
            position: 'absolute',
            left: String(225 + 35*idx) + 'px', top: '20px',
            width: '25px', height: '25px',
            backgroundImage: "url(" + require('../../imgs/icons/' +img+ '.png') + ")",
            backgroundSize: '25px 25px',
        });
    }

    btnAction = (idx) => {
        /* 순서대로 공유, 좋아요, 구매/관심없음 */
        return () => {
            if(idx === 1) {
                /* TODO: Backend 에 알려서, likes 바꿔야 함 */
                this.setState({liked: !this.state.liked})
            }
        };
    }

    render() {
        const { author, type } = this.props;
        return (
            <div className='postHead'>
                {[0,1,2].map((idx) =>
                    <button /* 3개의 버튼을 순서대로 생성 */
                        style={this.getBtn(idx, type)}
                        onClick={this.btnAction(idx)}
                        />)}
                <User userInfo={author} />
            </div>
        );
    }
}

export default PostHead;
