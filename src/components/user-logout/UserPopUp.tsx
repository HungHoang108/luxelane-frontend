import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserPopUp = () => {
  const nav = useNavigate();

  const toUserProfile = () => {};
  const removeUserData = () => {
    localStorage.removeItem("userInfo");
  };
  return (
    <div className="profileBox">
      {/* <div className="dropdown-content">
        <Link className="profileBox-link" onClick={toUserProfile} to="">
          Profile
        </Link>
        <Link className="profileBox-link" onClick={removeUserData} to="">
          Log out
        </Link>
      </div> */}
      <div className="profile-boxsub">
        <div>
          <Link className="profileBox-link" onClick={toUserProfile} to="">
            Profile
          </Link>
        </div>
        <div onClick={removeUserData}>
          <Link className="profileBox-link" onClick={removeUserData} to="">
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPopUp;
