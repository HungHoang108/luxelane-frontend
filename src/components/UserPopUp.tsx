import { Link } from "react-router-dom";

const UserPopUp = () => {

  const removeUserData = () => {
    localStorage.removeItem("userToken");
  };
  return (
    <div className="profileBox">
      <div className="profile-boxsub">
        <div>
          <Link className="profileBox-link" to="userprofile">
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
