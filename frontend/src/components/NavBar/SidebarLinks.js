import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SidebarLinks.css'; // import the SidebarLinks stylesheet
import { logout } from '../../store/session';


  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
}
  
  const SidebarLinks = ({ isLoggedIn }) => {

    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();

    return (
      <ul className="sidebarLinks">
        <li>
          <Link to="/trending">Trending</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/your-feed">Your Feed</Link>
          ) : (
            <Link to="/login">Login to view Your Feed</Link>
          )}
        </li>
       
      </ul>
    );
  }
  
  export default SidebarLinks;
  
