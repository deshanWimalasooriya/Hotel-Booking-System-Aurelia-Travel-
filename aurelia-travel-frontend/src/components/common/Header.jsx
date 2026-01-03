import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom' // Added useNavigate
import { Search, Heart, User, LogOut, Settings } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import axios from 'axios' // Added axios
import './styles/header.css'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate() // Initialize navigate
  const { user, clearUser } = useUser() // removed 'logout', using 'clearUser' based on reference
  
  // State for Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // --- NEW LOGOUT FUNCTION (From Reference) ---
  const handleLogout = async () => {
    // Close the dropdown immediately for better UX
    setDropdownOpen(false);

    try {
      // 1. Call Backend API to invalidate session
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });

      // 2. Clear Client-Side Storage
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Clear cookie manually if needed
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      // 3. Clear Context State
      clearUser();

      // 4. Navigate to Auth Page
      navigate('/auth');

    } catch (err) {
      console.error('Logout error:', err);
      // Even if API fails, we still force clear local state and redirect
      clearUser();
      navigate('/auth');
    }
  };
  // ---------------------------------------------

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">Aurelia Travel</Link>
        <nav className="header-nav">
          <Link to="/" className={`header-nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/hotels" className="header-nav-link">Hotels</Link>
          <Link to="/vehicles" className="header-nav-link">Vehicles</Link>
          <Link to="/about" className="header-nav-link">About</Link>
          <Link to="/contact" className="header-nav-link">Contact</Link>
        </nav>
        <div className="header-actions">
          <button className="header-action">
            <Heart className="header-icon" />
          </button>
          <button className="header-action">
            <Search className="header-icon" />
          </button>
          
          {user ? (
            <div className="header-profile-container" ref={dropdownRef}>
              {/* Profile Icon Button */}
              <button 
                className="header-profile-btn" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.profile_image ? (
                  <img 
                    src={user.profile_image} 
                    alt="Profile" 
                    className="header-profile-img" 
                  />
                ) : (
                  <div className="header-profile-placeholder">
                    <User className="header-profile-icon-default" />
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="header-dropdown">
                  <div className="dropdown-user-details">
                    <span className="dropdown-username">{user.name || user.username || 'User'}</span>
                    <span className="dropdown-email">{user.email}</span>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings size={16} />
                    Profile
                  </Link>
                  
                  {/* Updated Logout Button */}
                  <button 
                    onClick={handleLogout} 
                    className="dropdown-item dropdown-logout"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary">Login</Link>
          )}
          
        </div>
      </div>
    </header>
  )
}

export default Header