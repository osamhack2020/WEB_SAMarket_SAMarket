import React, { Component } from "react";
import Header from "../components/header/Header";
import PostInfoList from "../components/post/PostInfoList";
import MenuBar from "../components/menubar/MenuBar";
import defaultState from "../data/posts.json";
import "./Pages.css";

class MainPage extends Component {
  state = defaultState;
  post_id = defaultState.posts.length;

  handleSearch = data => {
    /* 키워드 변경시 호출 */
    this.setState({
      keyword: data.keyword
    });
  };

  handleCreate = data => {
    /* Post 의 생성시 호출되는 함수
    post_id 를 1씩 증가시키며 posts 배열에 추가
    */
    const { posts } = this.state;
    this.setState({
      posts: posts.concat({ post_id: this.post_id++, ...data })
    });
  };

  handleRemove = post_id => {
    /* Post 의 post_id 를 key 로 삭제 */
    const { posts } = this.state;
    this.setState({
      posts: posts.filter(post => post.post_id !== post_id)
    });
  };

  handleUpdate = (post_id, data) => {
    /* post_id 에 해당하는 Post 를 data 의 내용으로 변경 */
    const { posts } = this.state;
    this.setState({
      posts: posts.map(
        post =>
          post_id === post.post_id
            ? { ...post, ...data } // 새 객체를 만들어 할당
            : post // 기존 값 유지
      )
    });
  };

  render() {
    const { posts, keyword } = this.state;
    const filteredList = posts.filter(
      post =>
        post.contents.tags.indexOf(keyword) !== -1 ||
        post.contents.title.indexOf(keyword) !== -1
    ); // tag 또는 title 에 일치하는 검색어가 있는 것만 표시

    return (
      <div className="MainPage">
        <Header onSearch={this.handleSearch} />
        <PostInfoList
          posts={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
          onSearch={this.handleSearch}
        />
        <MenuBar />
      </div>
    );
  }
}

export default MainPage;
