import React, { Component } from 'react';
import './Post.css';


class PostForm extends Component {
    static defaultProps = {
        startEdit: false,
        title: '',
        price: '',
    }

    state = {
        start: true,
        title: '',
        price: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(); // 리로딩 방지
        this.props.onCreate(this.state); // onCreate 이벤트로 부모에 전달
        this.setState({
            title: '',
            price: '',
        })
    }

    setDefaultValue = () => {
        this.setState({
            start: false,
            title: this.props.title,
            price: this.props.price,
        });
    }

    render() {
        if (this.state.start) {
            this.setDefaultValue();
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input
                        placeholder='제목'
                        value={this.state.title}
                        onChange={this.handleChange}
                        name='title'
                    />
                    <input
                        placeholder='가격'
                        value={this.state.price}
                        onChange={this.handleChange}
                        name='price'
                    />
                </div>
                <button type='submit'>게시</button>
            </form>
        )
    }
}

export default PostForm;
