import React, { Component } from 'react';
import Profile from '../../data/user/profile.json'
import User from '../user/User';
import './Post.css';

class PostHead extends Component {
    state = {
        liked: Profile.likes.indexOf(this.props.post_id) >= 0
    }
    getSvgs = () => {
        let svgs = {}
        let imgSrcs = ['share', 'like', 'liked' , 'buy', 'deny']
        for (let idx in imgSrcs){
            svgs[imgSrcs[idx]] = require('../../imgs/icons/' +imgSrcs[idx]+ '.svg')
        } return svgs
    }
    svgs = this.getSvgs()

    getBtn = (idx) => {
        const img = {
            0: 'share',
            1: this.state.liked? 'liked' :'like',
            2: this.props.type === 'sell'? 'buy' :'deny'}[idx]
        return ({
            border: 0, outline: 0, cursor: 'pointer',
            position: 'absolute',
            top: '20px', left: String(225 + 35*idx) + 'px',
            background: "url(" + this.svgs[img] + ")",
            backgroundSize: '25px 25px',
            width: '25px', height: '25px',
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
        const { author } = this.props;
        return (
            <div className='postHead'>
                {[0,1,2].map((idx) =>
                    <button /* 3개의 버튼을 순서대로 생성 */
                        style={this.getBtn(idx)}
                        onClick={this.btnAction(idx)}
                        />)}
                <User userInfo={author} />
            </div>
        );
    }
}

export default PostHead;
