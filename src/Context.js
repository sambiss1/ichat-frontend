import { createContext, useState } from "react";
import axios from "axios";


export const UserContext = createContext({ token: "", userId: "", auth: false })

export const Provider = ({ children }) => {

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [auth, setAuth] = useState(false);

    const [conversationId, setConversationId] = useState("");
    const [contactPersonId, setContactPersonId] = useState("");
    const [contactPerson, setContactPerson] = useState({});
    const [discussion, setDiscussion] = useState([]);



    const [selectedConversation, setSelectedConversation] = useState(false)



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
                getContactPerson,
                discussion,
                setDiscussion,
                selectedConversation,
                setSelectedConversation,
                auth,
                setAuth
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default Provider;