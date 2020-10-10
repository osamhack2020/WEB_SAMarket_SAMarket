import React, { Component } from 'react';
import './MenuBar.css'


class MenuBar extends Component {
    state = {
        keyword: '',
    }

    render() {
        return (
            <div className='menuBar'>
                메뉴바
            </div>
        );
    }
}

export default MenuBar;
