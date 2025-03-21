import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetUserQuery, useLogoutMutation } from '../../store/slices/userSlice';
import './NavBar.scss';

function NavBar() {
  const navigate = useNavigate();
  const { data: user, isSuccess: isUserAuthent, refetch } = useGetUserQuery(); 
  const [logoutUser, { isSuccess: isLogoutSuccess  }] = useLogoutMutation(); 

  const handleLogout = async () => {
    await logoutUser(); 
    await refetch(); 
    navigate('/login'); 
  };

  useEffect(() => {
    if (isLogoutSuccess ) {
      refetch();
    }
  }, [isLogoutSuccess , refetch]);

  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>

        {isUserAuthent && user ? (
          <>
            <li><NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>Admin</NavLink></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
        )}
        
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
