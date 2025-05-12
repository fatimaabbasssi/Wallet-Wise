import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // If the user is not logged in, redirect them to the login page
    return <Navigate to="/" replace />;
  }

  return children; // If the user is authenticated, render the children (protected content)
};

export default ProtectedRoute;