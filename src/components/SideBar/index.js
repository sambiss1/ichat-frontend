import React from 'react';
import "./sidebar.css";
import { MdLogout } from "react-icons/md"

const SideBar = () => {
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
            <div>

            </div>
            <div>
                <MdLogout />
            </div>

        </div>
    )
}

export default SideBar