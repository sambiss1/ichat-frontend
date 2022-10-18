import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./loginForm.css"

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginFuntion = (event) => {
        event.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:8000/api/user/login",
            data: {
                username: username,
                password: password
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                navigate("/home", { replace: true })
                window.localStorage.setItem("token", response.data.token)
                window.localStorage.setItem("userID", response.data.payload.id)
            })
            .catch(error => console.error(error))
    }
    return (
        <form
            onSubmit={loginFuntion}
            className="login__form--container">
            <p>

                <input
                    type="text"
                    placeholder="username or email"
                    className="login__form--username__input"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
            </p>
            <p>
                <input
                    type="password"
                    placeholder="password"
                    className="login__form--password__input"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </p>
            <p>
                <input
                    type="submit"
                    value="Login"
                    className="login__form--submit__button"
                />
            </p>
        </form>
    )
}

export default LoginForm