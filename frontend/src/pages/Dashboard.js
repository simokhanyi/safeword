import React from 'react';
import PasswordList from '../components/Dashboard/PasswordList';
import Profile from '../components/Dashboard/Profile';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Profile />
      <PasswordList />
    </div>
  );
};

export default Dashboard;
