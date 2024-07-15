const axios = require('axios');

const login = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'simokhanyi@gmail.com',
      password: '@Masasa12'
    });
    console.log('Login successful:', response.data);
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
  }
};

login();
