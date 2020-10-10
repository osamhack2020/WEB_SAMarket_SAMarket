import React, { useState, useEffect, useRef } from 'react'
import SearchBar from './SearchBar';
import Profile from '../profile/Profile';
import './Header.css';


const Header = ({ onSearch }) => {
    /* hook 을 맨 위로 쓸 것 */
    const [pageY, setPageY] = useState(0);
    const documentRef = useRef(document);
    useEffect(() => {
        documentRef.current.addEventListener('scroll', handleScroll);
        return () => documentRef.current.removeEventListener('scroll', handleScroll);
    }, [pageY]);

    const handleScroll = () => {
        const { pageYOffset } = window;
        setPageY(pageYOffset);
    }

    return (
        <div className={pageY <= 200? 'head': 'crouch'}>
            <Profile/>
            <SearchBar onSearch={onSearch} />
        </div>
    )
}

export default Header