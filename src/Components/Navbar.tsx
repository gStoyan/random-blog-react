import React from 'react';
import Dropdown from './Dropdown';


const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>My Random Blog</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/statistics">Statistics</a>
        <a href="/login">Login</a>
        <a href="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>New Blog</a>
      </div>
    </nav>
  );
}
 
export default Navbar;