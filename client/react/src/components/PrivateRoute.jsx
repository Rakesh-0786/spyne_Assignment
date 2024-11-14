import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('authToken'); 

  if (!isAuthenticated) {
   
    return <Navigate to="/login" replace />;
  }

  
  return <Outlet />; //to append child
};

export default PrivateRoute;
