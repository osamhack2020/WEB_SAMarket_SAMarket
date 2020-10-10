import React, { Component } from 'react';
import PostForm from './PostForm';
import './Post.css';

class PostInfo extends Component {
    static defaultProps = {
        info: {
            title: '제목',
            price: '0',
            id: 0
        },
    }

    state = {
        editing: false,
    }

    handleRemove = () => {
        /* App 에서 정의한 Remove handler 함수를 호출 */
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleToggleEdit = () => {
        /* 편집 상태 여부를 toggle */
        this.setState({ editing: !this.state.editing });
    }

    handleUpdate = (data) => {
        const { info, onUpdate } = this.props;
        onUpdate(info.id, {
            title: data.title,
            price: data.price,
        });
        this.setState({editing: false});
    }

    shouldComponentUpdate(nextProps, nextState) {
      // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
      if (!this.state.editing  
          && !nextState.editing
          && nextProps.info === this.props.info) {
        return false;
      }
      // 나머지 경우엔 리렌더링함
      return true;
    }

    render() {
        if(this.state.editing) {
            // 편집 중
            return (
                <div className="info">
                    <PostForm
                        title={this.props.info.title}
                        price={this.props.info.price}
                        onCreate={this.handleUpdate}
                    />
                    <button
                        className='rmbtn'
                        onClick={this.handleRemove}
                    >삭제</button>
                </div>
            )
        }

        const {
            title, price
        } = this.props.info;

        return (
            <div className="info">
                <div>
                    <div><b>{title}</b></div>
                    <div>{price}원</div>
                    <button onClick={this.handleToggleEdit}>수정</button>
                </div>
                <button
                    className='rmbtn'
                    onClick={this.handleRemove}
                >삭제</button>
            </div>
        );
    }
}

export default PostInfo
