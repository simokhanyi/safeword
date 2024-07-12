export const getUserData = async () => {
  try {
    // Replace with actual API call to fetch user data
    const response = await fetch('/api/user'); // Example API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json(); // Assuming response is JSON
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Rethrow the error for handling in Dashboard.js
  }
};
