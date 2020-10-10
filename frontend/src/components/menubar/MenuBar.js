import React, { Component } from 'react';
import './MenuBar.css'


class MenuBar extends Component {
    state = {
        clicked: 0,
    }

    getStyle = (idx) => {
        const img = {
            0: 'home', 1: 'shop', 2: 'post', 3: 'adv'
        }[idx] + (this.state.clicked === idx ?'Click': '')
        return ({
            position: 'absolute',
            top: '20px', left: String(20 + 15*idx) + '%',
            border: '0px solid',
            background: 'rgba(0,0,0,0)',
            backgroundImage: "url(" + require('../../imgs/icons/' +img+ '.png') + ")",
            backgroundSize: '30px 30px',
            width: '30px', height: '30px',
        });
    }

    render() {
        return (
            <div className='menuBar'>
                <button style={this.getStyle(0)}/>
                <button style={this.getStyle(1)}/>
                <button style={this.getStyle(2)}/>
                <button style={this.getStyle(3)}/>
                <button className='writeBtn'/>
            </div>
        );
    }
}

export default MenuBar;
