/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState, useContext } from "react";
import "./userlist.css";
import axios from "axios";
import { UserContext } from "../../Context";

let userId = localStorage.getItem("userID");
let token = localStorage.getItem("token");
const UserCard = ({ props }) => {
  const {
    conversationId,
    socket,
    setConversationId,
    setContactPersonId,
    contactPersonId,
    setContactPerson,
    contactPerson,
    discussion,
    setDiscussion,
    lastMessage,
    setLastMessage,
    setSelectedConversation,
    response,
    setResponse,
  } = useContext(UserContext);

  const createNewConversation = () => {
    console.log(`Logged user : ${userId}`);
    console.log(`Other user : ${props._id}`);
    let members = [userId, props._id];
    axios({
      method: "POST",
      url: `http://localhost:8000/api/conversations/new`,
      data: {
        participants: [userId, props._id],
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        console.log(response.data.conversations);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div
      className="user__list--card"
      onClick={() => {
        createNewConversation();
      }}
    >
      <div className="user__list--user__picture">
        <img src="/images/user.png" alt="profile pictur" />
      </div>
      <div className="user__list--user__message">
        <h3> {props.userName}</h3>
      </div>
    </div>
  );
};

const UserList = () => {
  const [userList, setUserList] = useState([]);
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userID");

  const getAllUsers = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8000/api/user/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="user__list--main__container">
      <h3>Users</h3>
      <div className="user__list--list">
        {userList.map(
          (user) =>
            user._id !== userId && <UserCard props={user} key={user._id} />
        )}
      </div>
    </div>
  );
};

export default UserList;
