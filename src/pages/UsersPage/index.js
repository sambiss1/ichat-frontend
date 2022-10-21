import React from 'react'
import Conversation from '../../components/Conversation'
import RecentsMessages from '../../components/RecentMessages'
import SearchBar from '../../components/SearchBar'
import SideBar from '../../components/SideBar'

const UsersPage = () => {
    return (
        <div className='home__page--container'>
            <SideBar />
            <div>
                <SearchBar />
                <RecentsMessages />
            </div>
            <Conversation />


        </div>
    )
}

export default UsersPage