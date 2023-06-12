import React from 'react';
// import './UserInfo.css'; 
import { useSelector } from 'react-redux';


const UserInfo = () => {

  const currentUser = useSelector(state => state.session.currentUser);

  return (
    <div className="userInfo">
      <div className="userInfo__headerPhoto">
        {/* User Image */}
      </div>
      <div>
      {currentUser.profileImageUrl ?
          <img className="profile-image" src={currentUser.profileImageUrl} alt="profile"/> :
          undefined
        }
        {currentUser.username}
      </div>
    </div>
  );
}

export default UserInfo;

