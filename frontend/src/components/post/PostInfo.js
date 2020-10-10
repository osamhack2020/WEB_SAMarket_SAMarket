import React, { Component } from 'react';
import Profile from '../../data/user/profile.json'
import User from '../user/User';
import Content from './Content'
import './Post.css';

class PostInfo extends Component {
    state = {
        liked: Profile.likes.indexOf(this.props.info.post_id) >= 0
    }

    getBtn = (idx, type) => {
        const img = {
            0: 'share',
            1: this.state.liked? 'liked' :'like',
            2: type === 'sell'? 'buy' :'deny'}[idx]

        return ({
            outline: '0', border: '0px solid',
            background: 'rgba(0,0,0,0)',
            position: 'absolute',
            left: String(225 + 35*idx) + 'px', top: '20px',
            width: '25px', height: '25px',
            backgroundImage: "url(" + require('../../imgs/icons/' +img+ '.png') + ")",
            backgroundSize: '25px 25px',
        });
    }

    btnAction = (idx) => {
        return () => {
            if(idx === 1) this.setState({liked: !this.state.liked})
        };
    }

    render() {
        const { author, type, contents } = this.props.info;
        return (
            <div className="info">
                {[0,1,2].map((idx) =>
                    <button /* 하단 4개의 버튼을 순서대로 생성 */
                        style={this.getBtn(idx, type)}
                        onClick={this.btnAction(idx)}
                        />)}
                <User userInfo={author} />
                <Content
                    type={type} contents={contents}
                    onSearch={this.props.onSearch}/>
            </div>
        );
    }
}

export default PostInfo
