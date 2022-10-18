import React, { useContext, useEffect, useState } from 'react';
import { BiSend } from "react-icons/bi"
import { BsCamera } from "react-icons/bs";
import { UserContext } from '../../Context';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

import "./conversations.css";

const Conversation = () => {
    const [message, setMessage] = useState("")


    let userId = localStorage.getItem("userID")
    let token = localStorage.getItem("token")

    const { contactPerson, discussion, conversationId, selectedConversation } = useContext(UserContext)


    const sendMessage = (event) => {
        event.preventDefault();
        axios({
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
                console.log(response.data)
                alert("Message send : ", message)

            })
            .catch(error => console.error(error))

    }


    const [sender, setSender] = useState("")
    // const [from]
    // discussion.messages ? console.log(discussion.messages.filter(message => message.sender === userId).map(content => content.messageText)) : console.log('undefined')

    // let sender = discussion.messages.filter(message => message.sender === userId).map(content => content.sender)

    const getSender = () => {

        let sender = discussion.messages.filter(message => message.sender === userId).map(content => content.sender)
        setSender(discussion.messages.filter(message => message.sender === userId).map(content => content.sender))

        discussion.messages ? setSender(discussion.messages.filter(message => message.sender === userId).map(content => content.sender)) : console.log("Waiting")

        // console.log(sender)

        // console.log(sender[0] === userId ? true : false)
    }

    useEffect(() => {
        setTimeout(() => {
            getSender()
        }, 500)

        // console.log(sender[0])

    }, [])

    console.log("UserId", userId)

    // .map(content => content.messageText)
    // discussion.messages ? console.log(discussion.messages.filter(message => message.sender !== userId && message.messageText)) : console.log("Waiting")

    // discussion.messages ? console.log(discussion.messages.filter(message => message.sender !== userId).map(content => content.messageText)) : console.log("Waiting")
   
    discussion.messages ? console.log(discussion.messages.filter(message => message.sender === userId).map(content => content.messageText)) : console.log("Waiting")
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
                            {!discussion.messages ?
                                (<h3>Loading messages...</h3>) :
                                (
                                    <div className="imessage">
                                        {sender[0] === userId ? (

                                            discussion.messages.filter(message => message.sender !== userId).map(content => content.messageText
                                                &&

                                                <div className="from-them">
                                                    <p>{content.messageText}</p>
                                                </div>
                                            )

                                        ) :
                                            (
                                                discussion.messages.filter(message => message.sender === userId).map(content => content.messageText
                                                    &&
                                                    <div className="from-me">
                                                        <p>{content.messageText}</p>
                                                    </div>
                                                )
                                            )

                                        }


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
                                />
                                {/* <EmojiPicker /> */}
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
            {/* <div>

            </div> */}
        </div>
    )
}

export default Conversation