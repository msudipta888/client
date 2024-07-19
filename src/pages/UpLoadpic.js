import axios from "axios";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";  // Import the icon
import "./UpLoadpic.css";

const UpLoadpic = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const submitChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      const res = await axios.post("http://localhost:5000/profile/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(res.data.url);
      setImageUrl(res.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="upload-container">
      <form onSubmit={submitChange} className="upload-form">
        {imageUrl && (
          <img 
            src={`http://localhost:5000${imageUrl}`}
            height={100}
            width={100}
            className="profile-pic"
            alt="profile"
          />
        )}
        <label htmlFor="file-upload" className="upload-label">
          <FaUpload className="upload-icon" />
          <span>Upload Profile Picture</span>
        </label>
        <input 
          type="file" 
          accept="image/*" 
          id="file-upload" 
          onChange={handleChange} 
          className="upload-input" 
        />
        <button type="submit" className="upload-btn">Submit</button>
      </form>
    </div>
  );
};

export default UpLoadpic;
