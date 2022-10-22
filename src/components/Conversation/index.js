import React, { useContext, useEffect, useState } from 'react';
import { BiSend } from "react-icons/bi"
import { BsCamera } from "react-icons/bs";
import { UserContext } from '../../Context';
import axios from 'axios';

import "./conversations.css";
import { Socket } from 'socket.io-client';

const Conversation = () => {
    const [message, setMessage] = useState("")

    const [messageSend, setMessageSend] = useState("");



    let userId = localStorage.getItem("userID")
    let token = localStorage.getItem("token")

    const { contactPerson, discussion, conversationId, selectedConversation, socket, setDiscussion } = useContext(UserContext)


    const sendMessage = async (event) => {
        event.preventDefault();


        await axios({
            method: "POST",
            url: "http://localhost:8000/api/message/new",
            data: {
                conversationId: conversationId,
                sender: userId,
                messageText: message
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            }
        })
            .then((response) => {
                alert("Message send : ", response.data.newMessage.messages)
                setDiscussion((prevState) => [...prevState, response.data.newMessage.messages])
                // socket.emit("send-message", {
                //     conversation: conversationId,
                //     sender: userId,
                //     message: message,
                // });
                socket.emit("send-message", {message: "Hello, this is socket message"})
            })
            .catch(error => console.error(error))

        socket.emit("test-send", { message })
        event.target.reset();

    }

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
    useEffect(() => {
        getAConversation();

        socket.on("receive-message", (data) => {
            // setDiscussion((prevState) => [...prevState, data])
            alert(data.messages)
        });

    }, [socket])
    return (
        <div className="discussion__main--container">
            {selectedConversation ?
                (
                    <div className="discussion__main--content">

                        <div className="contact__person--container">
                            <div className="contact__person--profile">

                                <img
                                    src="/images/user.png"
                                    alt="profile pictur"

                                />
                            </div>
                            <div className="contact__person--details">
                                <h3>{contactPerson.firstName} {contactPerson.lastName}</h3>
                                <p>Online</p>
                            </div>
                        </div>
                        <div className="discussion__main--content">
                            {!discussion ?
                                (<h3>Loading messages...</h3>) :
                                (
                                    <div
                                        className="imessage"

                                    >
                                        {discussion.map(content => content.sender === userId ?
                                            (<div
                                                className="from-me"
                                                key={content._id}
                                            >
                                                <p>{content.messageText}</p>
                                            </div>) :

                                            (
                                                <div
                                                    className="from-them"
                                                    key={content._id}>
                                                    <p>{content.messageText}</p>
                                                </div>
                                            )
                                        )}
                                    </div>)
                            }
                        </div>
                        <form
                            onSubmit={sendMessage}
                            className="send__message--form"
                        >
                            <div
                                className="send__message--content"
                            >

                                <input
                                    type="text"
                                    onChange={(event) => setMessage(event.target.value)}
                                    className="send__message--text"
                                    placeholder="Type message here"
                                />

                                <BsCamera
                                    className="send__message--image"
                                />
                            </div>
                            <button
                                type="submit"
                                className="send__message--button">
                                <BiSend />
                            </button>
                        </form>
                    </div>


                ) : (
                    <div className="no__selected--container">

                        <div className="no__selected--content">

                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default Conversation