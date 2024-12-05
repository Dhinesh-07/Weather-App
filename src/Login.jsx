import React, { useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './Styles/login.css';

export const Login = (props) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [loginResponse, setLoginResponse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const navigate = useNavigate(); // Initialize navigate function

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      border: '2px solid #800080',
      background: 'linear-gradient(to right, #ffafbd, #ffc3a0)',
      boxShadow: '0px 3px 20px 0px rgba(0, 0, 0, 0.2)',
      padding: '20px',
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, pass);

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: username, password: pass })
    })
      .then((response) => response.json())
      .then((data) => {
        setLoginResponse(data);
        setModalIsOpen(true);

        // Check for successful login based on errorcode
        if (data.errorcode === 200) {
          // Display popup for 3 seconds
          setTimeout(() => {
            setModalIsOpen(false);
            props.onLoginSuccess();  // Trigger login success callback
            navigate('/home');  // Redirect to /home after successful login
          }, 3000);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    
      <div className="App-css"> 
    <div className="auth-form-container">
      <h2>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          type="text" 
          placeholder="youremail@gmail.com" 
          id="username" 
          name="username" 
        />
        <label htmlFor="password">Password</label>
        <input 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          type="password" 
          placeholder="**********" 
          id="password" 
          name="password" 
        />
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')} >Don't have an account? Register here.</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Login Status"
      >
        <div>
          {loginResponse && (
            <div className="login-response">
              <p>Error Code: {loginResponse.errorcode}</p>
              <p>Message: {loginResponse.message}</p>
              <p>Description: {loginResponse.description}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
    </div>
  );
}
