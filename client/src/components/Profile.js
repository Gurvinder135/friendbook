import React from "react";

function Profile({ username, firstname, lastname }) {
  return (
    <div className="profile">
      <div className="profileHead">
        <div className="profileLogo">{firstname[0]}</div>
        <div className="profileUsername">{username}</div>
      </div>
      <hr></hr>
      <div className="profileName">{`Firstname: ${firstname}`}</div>

      <div className="profileName">{`Lastname: ${lastname}`}</div>
      <hr></hr>
    </div>
  );
}

export default Profile;
