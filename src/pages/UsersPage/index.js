import React from "react";
import Conversation from "../../components/Conversation";
import RecentsMessages from "../../components/RecentMessages";
import SearchBar from "../../components/SearchBar";
import SideBar from "../../components/SideBar";
import UserList from "../../components/UserList";

const UsersPage = () => {
  return (
    <div className="home__page--container">
      <SideBar />
      <div>
        <SearchBar />
        <UserList />
      </div>
      <Conversation />
    </div>
  );
};

export default UsersPage;
