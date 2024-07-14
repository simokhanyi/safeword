import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to SAFEWORD</h1>
      <p>Manage your secure emails and passwords easily and safely.</p>
      <div>
        <Button variant="primary" as={Link} to="/login" className="m-2">Login</Button>
        <Button variant="secondary" as={Link} to="/register" className="m-2">Sign Up</Button>
      </div>
    </div>
  );
};

export default Home;
