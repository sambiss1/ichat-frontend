import { React, useState, useEffect, useContext } from 'react'

import axios from 'axios';
import { UserContext } from '../../Context';
import "./recentsMessages.css";


const RecentMessageCard = ({ props }) => {
    let userId = localStorage.getItem("userID")
    // console.log(props.participants.filter(participant => participant._id !== userId))

    const { setConversationId, setContactPersonId, getContactPerson } = useContext(UserContext);

    return (
        <div
            className="recent__message--card"
            onClick={() => {
                // console.log(props._id);
                setConversationId(props._id)
                setContactPersonId(props.participants.filter(participant => participant._id !== userId).map((user) => user._id).join("").toString())
                getContactPerson();
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
                    props.participants.filter(participant => participant._id !== userId).map((user) =>
                        <h3 key={user._id}>{user.userName}</h3>
                    )

                }
                {
                    props.messages.length <= 'O' ? (<p>...</p>) : (
                        <p>{props.messages.messageText}</p>
                    )
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
                    //  console.log(recentMessages);

                    // console.log(recentMessages.map((conversation) => conversation.messages))
                    setLastMessage(recentMessages.map((conversation) => conversation.messages))
                    // console.log(participants)  
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