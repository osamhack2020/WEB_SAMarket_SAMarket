import React, { useState, useEffect, useRef } from 'react'
import SearchBar from './SearchBar';
import Profile from '../profile/Profile';
import './Header.css';


const Header = (props) => {
    const { onChange } = props; 
    const [pageY, setPageY] = useState(0);
    const documentRef = useRef(document);

    const handleScroll = () => {
        const { pageYOffset } = window;
        setPageY(pageYOffset);
    }

    useEffect(() => {
        documentRef.current.addEventListener('scroll', handleScroll);
        return () => documentRef.current.removeEventListener('scroll', handleScroll);
    }, [pageY]);

    return (
        <div className={pageY <= 200? 'head': 'crouch'}>
            <Profile/>
            <SearchBar onChange={onChange} />
        </div>
    )
}

export default Header