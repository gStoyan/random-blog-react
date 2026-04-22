import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>My Random Blog</h1>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/statistics">Statistics</NavLink>

        {!isAuthenticated ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <span className="user-greeting">Hello, {user?.name}!</span>
            <NavLink
              to="/create"
              style={{
                color: "white",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
            >
              New Blog
            </NavLink>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
