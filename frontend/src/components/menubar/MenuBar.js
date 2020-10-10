import React, { Component } from 'react';
import './MenuBar.css'


class MenuBar extends Component {
    state = {
        clicked: 0,
    }

    getBtnStyle = (idx) => {
        /* 각 버튼 별로 스타일을 불러옴 */
        const img = {
            0: 'home', 1: 'shop', 2: 'post', 3: 'adv'
        }[idx] + (this.state.clicked === idx ?'Click': '')
        return ({
            outline: '0',
            position: 'absolute',
            top: '20px', left: String(20 + 15*idx) + '%',
            border: '0px solid',
            background: 'rgba(0,0,0,0)',
            backgroundImage: "url(" + require('../../imgs/icons/' +img+ '.png') + ")",
            backgroundSize: '30px 30px',
            width: '30px', height: '30px',
        });
    }

    switchPage = (idx) => {
        return () => {
            /* idx 에 해당하는 버튼을 눌렀을 때, 동작을 여기에 작성 */
            this.setState({clicked: idx});
        };
    }

    render() {
        return (
            <div className='menuBar'>
                {[0,1,2,3].map((idx) =>
                    <button /* 하단 4개의 버튼을 순서대로 생성 */
                        style={this.getBtnStyle(idx)}
                        onClick={this.switchPage(idx)}/>)}
                <button className='writeBtn'/>
            </div>
        );
    }
}

export default MenuBar;
