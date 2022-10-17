import React, { useContext, useState } from 'react';
import { BiSend } from "react-icons/bi"
import { BsCamera } from "react-icons/bs";
import { UserContext } from '../../Context';
import axios from 'axios';
import "./conversations.css";

const Conversation = () => {
    const [message, setMessage] = useState("")
    let conversationId = "63499ca9ef88e2c931d016b0";
    let sender = "6348641848310f2615dc7a19"
    let token = localStorage.getItem("token")

    const { contactPerson } = useContext(UserContext)


    const sendMessage = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:8000/api/message/new",
            data: {
                conversationId: conversationId,
                sender: sender,
                messageText: message
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                console.log(response.data)
                alert("Message send : ", message)
                // window.localStorage.setItem("token", response.token)
                // // navigate("/", { replace: true })
            })
            .catch(error => console.error(error))

    }


    console.log(contactPerson)
    return (
        <div className="discussion__main--container">
            <div>
                <h3>{contactPerson.firstName} {contactPerson.lastName}</h3>
            </div>
            <div></div>
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
    )
}

export default Conversation