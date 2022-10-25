import { useContext } from "react";
import { MdLogout } from "react-icons/md";
import NavBar from "../NavBar";
import "./sidebar.css";
import { UserContext } from "../../Context";

const SideBar = () => {
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
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
