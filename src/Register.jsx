import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
export const Register = (props) => {
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [first_name, setFirstname] = useState('');
const [last_name, setLastname] = useState('');
const [pass, setPass] = useState('');
const [confirm_password, setConfirmpassword] = useState('');
const [phone_number, setPhonenumber] = useState('');
const [date_of_birth, setDateofbirth] = useState('');
const [user_type, setUsertype] = useState('');
const [registerResponse, setRegisterResponse] = useState(null);
const [modalIsOpen, setModalIsOpen] = useState(false);


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

 if (!email || !username || !first_name || !last_name || !pass || !confirm_password || !phone_number || !date_of_birth || !user_type) {
      console.error('Please fill in all fields.');
      return;
    }

 fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: pass,
        confirm_password: confirm_password,
        phone_number: phone_number,
        date_of_birth: date_of_birth,
        user_type: user_type
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setRegisterResponse(data);
        setModalIsOpen(true);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };


return(
<div className="App-css"> 
<div className="auth-form-container">
<h2>Register</h2>
<form className="register-form" onSubmit={handleSubmit}>

<label htmlFor="email">Email</label>
<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

<label htmlFor="username">User Name</label>
<input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="User Name" id="username" name="username" />

<label htmlFor="first_name">First Name</label>
<input value={first_name} onChange={(e) => setFirstname(e.target.value)} type="first_name" placeholder="First Name" id="first_name" name="first_name" />

<label htmlFor="last_name">Last Name</label>
<input value={last_name} onChange={(e) => setLastname(e.target.value)} type="last_name" placeholder="Last Name" id="last_name" name="last_name" />

<label htmlFor="password">Password</label>
<input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="**********" id="password" name="password" />

<label htmlFor="confirm_password">Confirm Password</label>
<input value={confirm_password} onChange={(e) => setConfirmpassword(e.target.value)} type="password" placeholder="**********" id="confirm_password" name="confirm_password" />

<label htmlFor="phone_number">Phone Number</label>
<input value={phone_number} onChange={(e) => setPhonenumber(e.target.value)} type="phone_number" placeholder="Phone Number" id="phone_number" name="phone_number" />

<label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          value={date_of_birth}
          onChange={(e) => setDateofbirth(e.target.value)}
          id="date_of_birth"
          name="date_of_birth"
        />

<label htmlFor="user_type">User Type</label>
        <select value={user_type} onChange={(e) => setUsertype(e.target.value)} id="user_type" name="user_type">
          <option value="" disabled>Select User Type</option>
          <option value="superadmin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
    &nbsp;
<button type="submit">Register</button>
</form>
<button className="link-btn" onClick={() => props.onFormSwitch('login')} >Already have an account? Login here.</button>

 <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Register Status"
      >
       <div>
       {registerResponse && (
               <div className="register-response">
                 <p>Error Code: {registerResponse.errorcode}</p>
                 <p>Message: {registerResponse.message}</p>
                 <p>Description: {registerResponse.description}</p>
               </div>
             )}
       </div>
      </Modal>

</div>
</div>
);
};