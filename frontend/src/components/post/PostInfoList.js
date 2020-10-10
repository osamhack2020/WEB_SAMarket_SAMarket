import React, { Component } from 'react';
import PostInfo from './PostInfo';


class PostInfoList extends Component {
    static defaultProps = {
        posts: [],
        onRemove: () => console.warn('onRemove not defined'),
        onUpdate: () => console.warn('onUpdate not defined'),
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.posts !== this.props.posts;
    }

    render() {
        const { posts, onRemove, onUpdate, onSearch } = this.props;
        const list = posts.map(
            post => (
            <PostInfo
                key={post.id} info={post}
                onRemove={onRemove}
                onUpdate={onUpdate}
                onSearch={onSearch}
            />)
        );

        return (
            <div>
                {list}
            </div>
        )
    }
}

export default PostInfoList
