import { React, useState, useEffect } from 'react'

import axios from 'axios';
import "./recentsMessages.css";


const RecentMessageCard = ({ props }) => {
    return (
        <div className="recent__message--card">
            <div className="recent__message--user__picture">
                <img
                    src="/images/user.png"
                    alt="profile pictur"

                />
            </div>
            <div className="recent__message--user__message">
                <h3>{props.participants[1].userName}</h3>
                {/* {console.log({ messageText: props.messages })} */}
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
    const [participants, setParticipants] = useState([]);
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
                        "Authorization": `Bearer ${token}`
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

    console.log(participants)
    console.log(lastMessage)

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
                                key={conversation.participants._id}

                            />
                        )
                        )



                }


            </div>
        </div>
    )
}

export default RecentsMessages