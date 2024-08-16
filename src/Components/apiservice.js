// src/services/apiService.js
export const loginUser = async (credentials) => {
  try {
    // Encode credentials as x-www-form-urlencoded
    const encodedCredentials = new URLSearchParams(credentials).toString();

    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodedCredentials,
    });

    const responseText = await response.text(); // Get the response as text

    if (!response.ok) {
      throw new Error(responseText || 'Failed to login');
    }

    // Assuming the server response includes the username in the text
    // You may need to adjust this if your server response is different
    const result = { message: responseText, username: credentials.username };

    return result;
  } catch (error) {
    throw new Error(error.message || 'Login Error');
  }
};


// src/services/apiService.js

export const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // Check if the response is JSON or plain text
      const contentType = response.headers.get('content-type');
      let result;
  
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // Handle plain text response
        const textResponse = await response.text();
        result = { message: textResponse };
      }
  
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(result.message || 'An error occurred');
      }
  
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  