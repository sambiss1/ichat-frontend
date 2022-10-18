import React from 'react';
import { MdLogout } from "react-icons/md";
import NavBar from '../NavBar';
import "./sidebar.css";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <div
            className="side__bar--container"
        >
            <div className="side__bar--user__profile">
                <img
                    src="/images/user.png"
                    alt="profile pictur"

                />
            </div>
            <NavBar />
            <div>
                <MdLogout
                    onClick={() => {
                        navigate("/", { replace: true })
                        localStorage.clear();
                        // window.location("/")
                    }}
                />
            </div>

        </div>
    )
}

export default SideBar