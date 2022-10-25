import React, { useContext } from "react";
import { MdLogout } from "react-icons/md";
import NavBar from "../NavBar";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";

const SideBar = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(UserContext);
  return (
    <div className="side__bar--container">
      <div className="side__bar--user__profile">
        <img src="/images/user.png" alt="profile pictur" />
      </div>
      <NavBar />
      <div>
        <MdLogout
          onClick={() => {
            setAuth(false);
            localStorage.clear();
            navigate("/", { replace: true });
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
