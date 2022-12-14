/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

export const UserContext = createContext({
  token: "",
  userId: "",
  auth: false,
});

export const Provider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [auth, setAuth] = useState(false);

  const [conversationId, setConversationId] = useState("");
  const [contactPersonId, setContactPersonId] = useState("");
  const [contactPerson, setContactPerson] = useState({});
  const [discussion, setDiscussion] = useState([]);
  const [username, setUsername] = useState("");
  const [anError, setAnError] = useState(false);

  const socket = socketIOClient(`http://localhost:8000`);

  const [selectedConversation, setSelectedConversation] = useState(false);

  const [lastMessage, setLastMessage] = useState([]);

  const getContactPerson = async () => {
    await axios({
      method: "GET",
      url: `${process.env.DEV_MODE_SERVER_API}:${process.env.DEV_MODE_SERVER_PORT}/api/user/${contactPersonId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        setContactPerson(response.data);
      })
      .catch((error) => alert(error));
  };

  return (
    <UserContext.Provider
      value={{
        token,
        userId,
        username,
        setUsername,
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
        setAuth,

        lastMessage,
        setLastMessage,
        socket,
        anError,
        setAnError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Provider;
