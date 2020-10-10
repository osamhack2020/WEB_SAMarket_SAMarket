import React, { Component } from 'react';
import User from '../user/User';
import Content from './Content'
import './Post.css';

class PostInfo extends Component {
    render() {
        const { author, type, contents } = this.props.info;

        return (
            <div className="info">
                <User userInfo={author} />
                <Content
                    type={type} contents={contents}
                    onSearch={this.props.onSearch}/>
            </div>
        );
    }
}

export default PostInfo
