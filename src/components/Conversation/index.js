import axios from 'axios';
import React, { useState } from 'react';
import { BiSend } from "react-icons/bi"
import "./conversations.css";

const Conversation = () => {
    const [message, setMessage] = useState("")
    let conversationId = "63499ca9ef88e2c931d016b0";
    let sender = "6348641848310f2615dc7a19"
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
    return (
        <div className="discussion__main--container">

            {/* <div>
                <p>{message}</p>
            </div> */}
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    onChange={(event) => setMessage(event.target.value)}

                />
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