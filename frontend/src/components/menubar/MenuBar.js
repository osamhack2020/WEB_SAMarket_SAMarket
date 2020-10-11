import React, { Component } from 'react';
import './MenuBar.css'


class MenuBar extends Component {
    state = {
        clicked: 0,
    }

    imgs = {0: 'home', 1: 'shop', 2: 'post', 3: 'adv'}
    getSvgs = () => {
        let svgs = {}
        for (let idx in this.imgs){
            let img = this.imgs[idx]
            svgs[img] = require('../../imgs/icons/' +img+ '.svg')
            svgs[img+'Click'] = require('../../imgs/icons/' +img+ 'Click.svg')
        } return svgs
    }
    svgs = this.getSvgs()

    getBtnStyle = (idx) => {
        /* 각 버튼 별로 스타일을 불러옴 */
        const img = this.imgs[idx] + (this.state.clicked === idx ?'Click': '')
        return ({
            background: "url(" + this.svgs[img] + ") no-repeat center",
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
                    <button className='barBtn'/* 하단 4개의 버튼을 순서대로 생성 */
                        style={this.getBtnStyle(idx)}
                        onClick={this.switchPage(idx)}/>)}
                <button className='writeBtn'/>
            </div>
        );
    }
}

export default MenuBar;
