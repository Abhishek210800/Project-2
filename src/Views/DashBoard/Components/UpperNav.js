import { Menu as MenuIcon, User, UserCircle } from "lucide-react";
import { useProSidebar } from "react-pro-sidebar";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/AuthSlice"; 
import "./UpperNav.css";

const DashboardNav = () => {
  const { toggleSidebar } = useProSidebar();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const timeoutId = useRef(null);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setShowAccountMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setShowAccountMenu(false);
    }, 300);
  };

  const handleLogout = () => {
    // Dispatch a Redux action to clear auth state.
    dispatch(logoutUser());
    // Also clear any tokens or user data from storage if needed.
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/LogIn");
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <div className="navbar2">
      <button
        className="menu-toggle-btn"
        onClick={() => toggleSidebar(true)}
        aria-label="Toggle Sidebar"
      >
        <MenuIcon size={24} color="white" />
      </button>

      <div className="nav-actions">
        <div
          className="user-profile-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className={`icon-button ${showAccountMenu ? "active" : ""}`}>
            <User size={24} />
          </button>

          {showAccountMenu && (
            <div className="account-menu">
              <div className="account-info">
              <h6>Panalink Infotech Ltd.</h6>
              </div>
              <div className="menu-item">
                <div className="menu-icon">
                  <UserCircle size={25} />
                </div>
                <span>Account</span>
              </div>
              <div className="logout-wrapper">
                <button className="logout-btn" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
