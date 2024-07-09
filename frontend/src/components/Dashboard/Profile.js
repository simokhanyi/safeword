import React from 'react';

/**
 * Profile component.
 * @component
 * @example
 * return (
 *   <Profile />
 * )
 */
const Profile = () => {
  // Sample data, replace with actual data fetching logic
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <div>
      <h3>Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
