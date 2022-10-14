import { React, useState } from 'react'
import { HiChat } from "react-icons/hi"; 
// HiUserGroup
import { NavLink } from 'react-router-dom';
import "./navbar.css";

const NavBar = () => {
    // const [isActive, setIsActive] = useState("isAvtive")
    return (
        <nav className="nav__bar--container">
            <ul className="nav__bar--menu">

                <li >
                    <NavLink
                        to="/"
                    className={({ isActive }) => (isActive ? "isAvtive" : "nav__bar--item")}
                    >
                        <HiChat className="nav__bar--icon" />
                    </NavLink>
                </li>
                {/* <li className="nav__bar--item">
                    
                    <HiUserGroup className="nav__bar--icon" />
                </li> */}
            </ul>
        </nav>
    )
}

export default NavBar