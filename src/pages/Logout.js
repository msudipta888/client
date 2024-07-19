import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Import the CSS file for styling

const Logout = ({ email }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        console.log(email);
       const response = await axios.post("http://localhost:5000/api/users/logout", { email });
       const message = response.data.message;
        navigate('/login',{state:{message}});
        localStorage.removeItem('token');
      } catch (err) {
        console.log(err);
      }
    };

    logout();
  }, [email, navigate]);

  return (
    <div className="logout-container">
    </div>
    
  );
};

export default Logout;
