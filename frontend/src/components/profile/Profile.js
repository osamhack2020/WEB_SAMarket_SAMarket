import React, { useState, useEffect, useRef } from 'react'
import UserInfo from '../../data/user/profile.json';
import './Profile.css';


const Profile = () => {
    const { name, id, loc, org } = UserInfo;
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
        <div className='profile'>
            <div className='profileImg'/>
            <div className='name'>
                {name} {id}
            </div>
            <div className={pageY<=170 ?'belong' : 'belongOnly'}>
                {loc} {org}
            </div>
        </div>
    )
}

export default Profile