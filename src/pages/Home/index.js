import React from 'react';
import SideBar from '../../components/SideBar';
import RecentsMessages from '../../components/RecentMessages';
import Conversation from '../../components/Conversation';
import "./homepage.css"

const Home = () => {
    return (
        <div className='home__page--container'>
            <SideBar />
            <div>
                <input type="search" placeholder="Search here" />
                <RecentsMessages />
            </div>
            <div>
                <Conversation />

            </div>
        </div>
    )
}

export default Home