const UserProfile = () => {
  let userData = localStorage.getItem("userProfile");
  let parseUserData = userData && JSON.parse(userData);
  return (
    <div className="profile-box">
      <div className="profile-box-img">
        <img src={parseUserData.avatar} alt="" />
      </div>
      <div className="profile-box-info">
        <h1>{parseUserData.firstName} {parseUserData.lastName}</h1>
        <p>Id: {parseUserData.id}</p>
        <p>Role: {parseUserData.role}</p>
        <p>Email: {parseUserData.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
