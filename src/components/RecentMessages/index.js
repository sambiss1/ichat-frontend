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
                <h3>{props.userName}</h3>
                <p>Dinner ? </p>
            </div>

        </div>
    )
}

const RecentsMessages = () => {
    const [recentMessages, setRecentMessages] = useState([]);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchConversation = async () => {
            await axios.get("http://localhost:8000/api/conversations/")
                .then((response) => {
                    setRecentMessages(response.data.conversations)
                    console.log(recentMessages);
                    // recentMessages.map((conversation) => setParticipants(conversation.participants))
                    // console.log(participants)
                })
                .catch(error => alert(error));
        }

        fetchConversation();
    }, [])

    console.log(participants)

    return (
        <div className="recent__message--main__container">
            <h3>Recent</h3>
            <div className="recent__message--list">

                {
                    recentMessages.length <= 0 ?
                        (<h3>Loading...</h3>) :
                        (recentMessages.map((conversation) =>
                            conversation.participants[1] &&

                            <RecentMessageCard
                                props={conversation.participants[1]}
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