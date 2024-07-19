import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpLoadpic from "./UpLoadpic";

import './Regis.css'
import { FaSpinner } from "react-icons/fa";
const Regis = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load,setLoad] =useState(false)
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        setLoad(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Unexpected error occured please try again later!");
      }
    }
  };

  return (
    <div>
      {
         ( load && !error) ? <FaSpinner className="spin"/>
      :
    <div className="box">
      <h1>Register Form</h1>
      <div>
        <UpLoadpic/>
        </div>
      <form onSubmit={handleSubmit}>
        <input className="name"
          type="text"
          placeholder="Enter your name..."
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <br />
        <input className="email"
          type="email"
          placeholder="Enter your email..."
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input className="password"
          type="password"
          placeholder="Enter your password..."
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit" className="btn">Submit</button>
      </form>
      {error && <p style={{ color: "red", fontSize: "18px" }}>{error}</p>}
    </div>
}
    </div>
  );
};

export  default Regis;
