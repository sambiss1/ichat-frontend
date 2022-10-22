/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import "./userlist.css";
import axios from 'axios';


let userId = localStorage.getItem("userID");

const UserCard = ({ props }) => {

    return (
        <div
            className="user__list--card"
            onClick={() => {
                // socket.emit("join", { userId, room })
                // getThisConversation(props._id)
                // setContactPersonId(props.participants.filter(participant => participant._id !== userId).map((user) => user._id).join("").toString())
                // getContactPerson();
                // getAConversation();
                // setSelectedConversation(true)

                // console.log("Contact person : ", contactPerson)

            }}
        >
            <div
                className="user__list--user__picture">
                <img
                    src="/images/user.png"
                    alt="profile pictur"
                />
            </div>
            <div className="user__list--user__message">
                <h3 > {props.userName}</h3>

            </div>

        </div>
    )
}


const UserList = () => {
    const [userList, setUserList] = useState([]);
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userID");



    const getAllUsers = async () => {
        await axios(
            {
                method: "GET",
                url: `${process.env.DEV_MODE_SERVER_API}:${process.env.DEV_MODE_SERVER_PORT}/api/user/`,
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `${token}`
                }
            }
        )
            .then((response) => {
                setUserList(response.data)

            })
            .catch(error => alert(error));
    }
    useEffect(() => {
        getAllUsers()
        console.log(userList.filter(user => user._id !== userId));

    }, [])
    return (
        <div className="user__list--main__container">
            <h3>Users</h3>
            <div className="user__list--list">
                {
                    (userList.map((user) =>
                        user._id !== userId &&
                        <UserCard
                            props={user}
                            key={user._id}
                        />
                    )
                    )
                }
            </div>
        </div>
    )
}

export default UserList