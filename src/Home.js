// src/components/Sidenav.js
import React, { useState } from 'react';
import { FaTasks, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidenav ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidenav}>
        {isOpen ? '<<' : '>>'}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/todo">
              <FaTasks /> <span className="nav-text">Todo</span>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUserPlus /> <span className="nav-text">Register</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <FaSignInAlt /> <span className="nav-text">Login</span>
            </Link>
          </li>
          <li>
            <Link to='/logout'>
            <MdLogout />
            <span className="nav-text">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
