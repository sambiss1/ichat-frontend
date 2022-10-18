import { React, useState } from 'react'
import { HiChat, HiUserGroup } from "react-icons/hi";

import { NavLink } from 'react-router-dom';
import "./navbar.css";

const NavBar = () => {
    // const [isActive, setIsActive] = useState("isAvtive")
    return (
        <nav className="nav__bar--container">
            <ul className="nav__bar--menu">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "isAvtive" : "nav__bar--item")}
                >
                    <HiChat className="nav__bar--icon" />
                </NavLink>
                <NavLink
                    to="/user"
                    className={({ isActive }) => (isActive ? "isAvtive" : "nav__bar--item")}
                >
                    <HiUserGroup className="nav__bar--icon" />
                </NavLink>

                {/* <li className="nav__bar--item">
                    
                    <HiUserGroup className="nav__bar--icon" />
                </li> */}
            </ul>
        </nav>
    )
}

export default NavBar