import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ...

const UserInfo = () => {

  const currentUser = useSelector(state => state.session.currentUser);

  return (
    <div className="userInfo">
      <div className="userInfo__headerPhoto">
      </div>
      <div id= 'user-profile-info'>
      {currentUser.profileImageUrl ?
          <img className="profile-image" src={currentUser.profileImageUrl} alt="profile"/> :
          undefined
        }
       <Link to={`/profile/${currentUser.username}`} className="username-link">{currentUser.username}</Link>
      </div>
    </div>
  );
}

export default UserInfo;
