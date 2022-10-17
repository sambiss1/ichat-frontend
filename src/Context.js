import { createContext, useState } from "react";

const UserContext = createContext({ token: "", userId: "" })

const Provider = ({ children }) => {

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("")

    return (
        <UserContext.Provider value={
            {
                token,
                userId
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default Provider;