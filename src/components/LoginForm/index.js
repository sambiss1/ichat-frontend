import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import "./loginForm.css"

const LoginForm = () => {
    const navigate = useNavigate();
    const loginFuntion = (event) => {
        event.preventDefault();
        localStorage.setItem("token", "logged")
        navigate("/", { replace: true })
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
                />
            </p>
            <p>
                <input
                    type="password"
                    placeholder="password"
                    className="login__form--password__input"
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