import React, { Component } from 'react';
import './Header.css'


class SearchBar extends Component {
    state = {
        keyword: '',
    }

    handleSearch = (e) => {
        e.preventDefault(); // 리로딩 방지
        this.props.onChange(this.state)
        this.setState({
            keyword: '',
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form className='search' onSubmit={this.handleSearch}>
                <input
                    className='searchBar'
                    placeholder=' 태그 검색'
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    name='keyword'/>
                <button className='magnifier' type='submit'/>
            </form>
        );
    }
}

export default SearchBar;
