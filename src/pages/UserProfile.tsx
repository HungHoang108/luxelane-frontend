import React from "react";

const UserProfile = () => {
  let userData = localStorage.getItem("userInfo");
  let parseUserData = userData && JSON.parse(userData);
  return (
    <div >
      <div>
        <img src={parseUserData.avatar} alt="" />
      </div>
      <div>
        <h1>Name: {parseUserData.name}</h1>
        <p>Email: {parseUserData.email}</p>
        <p>Role: {parseUserData.role}</p>
        <p>Password: {parseUserData.password}</p>
      </div>
    </div>
  );
};

export default UserProfile;
