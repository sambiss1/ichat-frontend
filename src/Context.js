import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({ token: "", userId: "" })

export const Provider = ({ children }) => {

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("")

    const [recentMessages, setRecentMessages] = useState([]);

    const [conversationId, setConversationId] = useState("");
    const [contactPersonId, setContactPersonId] = useState("");
    const [contactPerson, setContactPerson] = useState({})

    const [lastMessage, setLastMessage] = useState([])

    // let token = `${localStorage.getItem("token")}`


    useEffect(() => {
        const fetchAllConversation = async () => {
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
                })
                .catch(error => alert(error));
        }

        fetchAllConversation();
    }, [])

    // const getAConversation = async () => {
    //     await axios(
    //         {
    //             method: "GET",
    //             url: "http://localhost:8000/api/conversations/",
    //             headers: {
    //                 "Content-Type": 'application/json',
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         }
    //     )
    //         .then((response) => {
    //             setRecentMessages(response.data.conversations)
    //         })
    //         .catch(error => alert(error));
    // }

    const getContactPerson = async () => {
        await axios(
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

    return (
        <UserContext.Provider value={
            {
                token,
                userId,
                conversationId,
                setConversationId,
                contactPersonId,
                setContactPersonId,
                contactPerson,
                setContactPerson,
                getContactPerson
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default Provider;