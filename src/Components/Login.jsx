import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/signupin.css'; // Import the common CSS
import { loginUser, registerUser } from './apiservice'; // Import API service functions
import {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validateConfirmPassword,
  validateRequiredField,
  validateUserName
} from './validation'; // Import validation functions

export default function Login({ setIsAuthenticated }) {
  const [isSignup, setIsSignup] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    age: '',
    phone_number: '',
    userEntity2: {
      city: '',
      country: ''
    },
    userEncrypt: {
      username: '',
      password: '',
      confirmpassword: ''
    }
  });
  const [loginMessage, setLoginMessage] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const navigate = useNavigate(); 
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };


  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    const propertyPath = name.split('.');

    setSignupData((prevData) => {
      const newData = { ...prevData };
      let temp = newData;

      for (let i = 0; i < propertyPath.length - 1; i++) {
        temp = temp[propertyPath[i]];
      }

      temp[propertyPath[propertyPath.length - 1]] = value;

      return newData;
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(loginData);
      console.log('Login successful:', result);

      // Store username in localStorage
      localStorage.setItem('username', loginData.username);

      // Update authentication state
      setIsAuthenticated(true);
      setLoginMessage('Login successful');
      navigate('/home'); // Redirect to home or desired route
    } catch (error) {
      console.error('Login error:', error.message);
      setLoginMessage('Login error: ' + error.message);
    }
  };
  
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Define validation error variables
    const nameError = validateRequiredField(signupData.name, 'Name');
    const emailError = validateEmail(signupData.email);
    const phoneNumberError = validatePhoneNumber(signupData.phone_number);
    const passwordError = validatePassword(signupData.userEncrypt.password);
    const confirmPasswordError = validateConfirmPassword(signupData.userEncrypt.password, signupData.userEncrypt.confirmpassword);
    const userNameError=validateUserName(signupData.userEncrypt.username);
    // Check for validation errors
    if (nameError) {
      setSignupMessage(nameError);
      return;
    }

    if (emailError) {
      setSignupMessage(emailError);
      return;
    }
	if(userNameError){
		setSignupMessage(userNameError);
	}

    if (phoneNumberError) {
      setSignupMessage(phoneNumberError);
      return;
    }

    if (passwordError) {
      setSignupMessage(passwordError);
      return;
    }

    if (confirmPasswordError) {
      setSignupMessage(confirmPasswordError);
      return;
    }

    try {
		const result = await registerUser(signupData);
		setSignupMessage(result.message || 'Registration successful');
        setTimeout(() => {
		  setIsSignup(false); 
		}, 3000); 
	  } catch (error) {
		setSignupMessage(`Registration error: ${error.message}`);
	  }
	};

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          {isSignup ? (
            <div className="form-container signup">
              <h2>Sign Up</h2>
              <form onSubmit={handleSignupSubmit}>
                <div className="signup__field">
                  <input  type="text" placeholder="Name" className="login__input" name="name" value={signupData.name} onChange={handleSignupChange} />
                  <input  type="text" placeholder="Email" className="login__input" name="email" value={signupData.email} onChange={handleSignupChange} />
                  <input type="text" placeholder="Age" className="login__input" name="age" value={signupData.age} onChange={handleSignupChange} />
                  <input type="number" placeholder="Phone Number" className="login__input" name="phone_number" value={signupData.phone_number} onChange={handleSignupChange} />
                  <input type="text" placeholder="City" className="login__input" name="userEntity2.city" value={signupData.userEntity2.city} onChange={handleSignupChange} />
                  <input type="text" placeholder="Country" className="login__input" name="userEntity2.country" value={signupData.userEntity2.country} onChange={handleSignupChange} />
                  <input  type="text" placeholder="Username" className="login__input" name="userEncrypt.username" value={signupData.userEncrypt.username} onChange={handleSignupChange} />
                  <input  type="password" placeholder="Password" className="login__input" name="userEncrypt.password" value={signupData.userEncrypt.password} onChange={handleSignupChange} />
                  <input  type="password" placeholder="Confirm Password" className="login__input" name="userEncrypt.confirmpassword" value={signupData.userEncrypt.confirmpassword} onChange={handleSignupChange} />
                </div>
                <button className="button login__submit">
                  <span className="button__text">Sign Up</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
                {signupMessage && <p className="response-message">{signupMessage}</p>}
              </form>
              <h3>
                Already have an account? <button onClick={() => setIsSignup(false)}>Login</button>
              </h3>
            </div>
          ) : (
            <div className="form-container login">
              <h2>Log In</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    name="username"
                    className="login__input"
                    placeholder="User name / Email"
                    value={loginData.username}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    name="password"
                    className="login__input"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <button className="button login__submit">
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
                {loginMessage && <p className="response-message">{loginMessage}</p>}
              </form>
              <br />
              <h3>
                Don't have an account? <button onClick={() => setIsSignup(true)}>Sign Up</button>
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
