// src/validation.js
export const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : 'Invalid email format';
  };
  
  export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+?\d{10}$/; 
    if (!regex.test(phoneNumber)) {
      return 'Phone number cannot be less than 10';
    }
    return null; // No error
  };
  export const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 7) {
      return 'Password must be at least 7 characters long';
    }
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasSpecialChar || !hasNumber || !hasUpperCase || !hasLowerCase) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return null; // No error
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return 'Confirm password is required';
    }
    return password === confirmPassword ? null : 'Passwords do not match';
  };
  export const validateUserName = (userName) => {
    // Check if the username is not empty
    if (!userName) {
      return 'Username is required';
    }
  
    // Check if the username starts with more than 3 numbers
    const startsWithNumbers = /^\d{4,}/.test(userName);
    if (startsWithNumbers) {
      return 'Username cannot start with more than three numbers';
    }
  
    // Add any additional validation rules here
  
    return null; // No error
  };
  
  export const validateRequiredField = (field, fieldName) => {
    return field ? null : `${fieldName} is required`;
  };
  