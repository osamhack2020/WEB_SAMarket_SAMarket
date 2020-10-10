import React, { Component } from 'react';
import PostInfoList from './components/post/PostInfoList';
import defaultState from './data/posts.json';
import './App.css'


class App extends Component {
  id = 2
  state = defaultState

  handleChange = (data) => {
    /* 키워드 변경시 호출 */
    this.setState({
      keyword: data.keyword,
    });
  }

  handleCreate = (data) => {
    /* Post 의 생성시 호출되는 함수
    id 를 1씩 증가시키며 posts 배열에 추가
    */
    const { posts } = this.state;
    this.setState({
      posts: posts.concat({ id: this.id++, ...data })
    })
  }

  handleRemove = (id) => {
    /* Post 의 id 를 key 로 삭제 */
    const { posts } = this.state;
    this.setState({
      posts: posts.filter(post => post.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    /* id 에 해당하는 Post 를 data 의 내용으로 변경 */
    const { posts } = this.state;
    this.setState({
      posts: posts.map(
        post => id === post.id
          ? { ...post, ...data } // 새 객체를 만들어 할당
          : post // 기존 값 유지
      )
    })
  }

  render() {
    const { posts, keyword } = this.state
    const filteredList = posts.filter(
      post => post.title.indexOf(keyword) !== -1
    );
    return (
      <div className='App'>
        <PostInfoList
          posts={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
