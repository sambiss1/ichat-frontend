/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */

import { useEffect, useState, useContext } from "react";
import "./userlist.css";
import axios from "axios";
import { UserContext } from "../../Context";

const userId = localStorage.getItem("userID");
const token = localStorage.getItem("token");

const UserCard = ({ props }) => {
  const { conversationId } = useContext(UserContext);

  const createNewConversation = () => {
    axios({
      method: "POST",
      url: `http://localhost:8000/api/conversations/new/${userId}/${props._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        console.log(response.data.conversations);
      })
      .catch((error) => console.error(error));

    console.log(conversationId);
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
