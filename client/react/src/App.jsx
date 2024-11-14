import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login'; // Your Login page component
import Home from './pages/Home'; // Your Home page component
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import CarsList from './pages/CarList';
import CarDisplay from './pages/CarDisplay'; // Import the CarDisplay component to show all cars

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addcar" element={<CarsList />} />
        <Route path="/cars" element={<CarDisplay />} /> {/* Route to display all cars */}

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} /> {/* Home is protected */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
