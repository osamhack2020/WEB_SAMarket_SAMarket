import React from 'react';
import Tag from './Tag';
import './Post.css';

const Content = (props) => {
    const { title, sub, tags, clr } = props.contents;
    const contentStyle = {
        position: 'absolute',
        top: '60px', left: '20px',
        width: '300px', height: '300px',
        border: '0px solid',
        borderRadius: '20px',
        background: clr.back || '#8990A0',
        boxShadow: '0 0 15px 0 rgba(80,80,80,30%)'
    }

    const titleStyle = {
        textAlign: 'center', fontWeight: 'bold',
        color: clr.font, fontSize: '30px',
        marginTop: '100px'
    }

    const subStyle = {
        textAlign: 'center', fontWeight: 'bold',
        color: clr.font, fontSize: '25px',
        marginTop: '5px'
    }

    return (
            <div style={contentStyle}>
                <div style={titleStyle}>{title}</div>
                <div style={subStyle}>
                    {sub+(props.type === 'sell' ?' 원' :'')}
                </div>
                <div className='tags'>
                    {tags.map(tag => 
                        <Tag
                            clr={clr} text={tag}
                            onSearch={props.onSearch}/>)}
                </div>
            </div>
    );
}

export default Content
