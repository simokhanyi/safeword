import React, { useEffect, useState } from 'react';
import PasswordList from '../components/Dashboard/PasswordList';
import Profile from '../components/Dashboard/Profile';
import { getUserData } from '../services/userService';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData && <Profile userData={userData} />}
      <PasswordList />
    </div>
  );
};

export default Dashboard;
