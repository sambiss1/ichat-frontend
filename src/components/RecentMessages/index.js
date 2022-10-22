import { React, useState, useEffect, useContext } from 'react'

import axios from 'axios';
import { UserContext } from '../../Context';
import "./recentsMessages.css";




const RecentMessageCard = ({ props }) => {
    const { conversationId, socket, setConversationId, setContactPersonId, contactPersonId, setContactPerson, contactPerson, discussion, setDiscussion, lastMessage, setLastMessage, setSelectedConversation, response, setResponse } = useContext(UserContext);
    
    let userId = localStorage.getItem("userID")
    let token = localStorage.getItem("token");

    let room = conversationId



    const getAConversation = async () => {
        await axios(
            {
                method: "GET",
                url: `http://localhost:8000/api/conversations/${conversationId}`,
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `${token}`
                }
            }
        )
            .then((response) => {
                if (response.statusCode === 404) {
                    return discussion
                }
                setDiscussion(response.data.messages)
            })
            .catch(error => alert(error));
    }

    const getContactPerson = () => {

        axios(
            {
                method: "GET",
                url: `http://localhost:8000/api/user/${contactPersonId}`,
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `${token}`
                }
            }
        )
            .then((response) => {
                setContactPerson(response.data)

            })
            .catch(error => alert(error));
    }

    const getThisConversation = (id) => {
        setConversationId(id)
    }


    return (
        <div
            className="recent__message--card"
            onClick={() => {
                socket.emit("join", { userId, room })
                getThisConversation(props._id)
                setContactPersonId(props.participants.filter(participant => participant._id !== userId).map((user) => user._id).join("").toString())
                getContactPerson();
                getAConversation();
                setSelectedConversation(true)

            }}
        >
            <div
                className="recent__message--user__picture">
                <img
                    src="/images/user.png"
                    alt="profile pictur"

                />
            </div>
            <div className="recent__message--user__message">
                {

                    props.participants.map(participant =>

                        participant._id !== userId ?
                            null
                            :
                            participant._id
                    ).includes(userId)
                        ?
                        props.participants.map(member =>

                            member._id !== userId &&
                            <h3 key={member._id}> {member.userName}</h3>
                        )
                        :
                        ""
                }
                {
                    props.messages ?
                        (<p>...</p>)
                        :
                        (<p>{props.messages.pop().messageText}</p>)
                }

            </div>

        </div>
    )
}

const RecentsMessages = () => {
    const [recentMessages, setRecentMessages] = useState([]);

    const [lastMessage, setLastMessage] = useState([])

    let token = `${localStorage.getItem("token")}`

    useEffect(() => {
        const fetchConversation = async () => {
            await axios(
                {
                    method: "GET",
                    url: "http://localhost:8000/api/conversations/",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `${token}`
                    }
                }
            )
                .then((response) => {
                    setRecentMessages(response.data.conversations)



                    setLastMessage(recentMessages.map((conversation) => conversation.messages))

                })
                .catch(error => alert(error));
        }

        fetchConversation();
    }, [])


    return (
        <div className="recent__message--main__container">
            <h3>Recent</h3>
            <div className="recent__message--list">

                {
                    recentMessages.length <= 0 ?
                        (<h3>Loading...</h3>) :
                        (recentMessages.map((conversation) =>
                            conversation &&
                            <RecentMessageCard
                                props={conversation}
                                key={conversation._id}

                            />
                        )
                        )



                }


            </div>
        </div>
    )
}

export default RecentsMessages