// In App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

const PrivateRoute = ({ children }) => {
  const { auth } = React.useContext(AuthContext);
  return auth.token ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { logout } = React.useContext(AuthContext);
  
  return (
    <div className='min-h-screen bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile onLogout={logout} />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
       <h1>Patient Management UI/ Patient Entry</h1>
       <p>This is a federated module</p>
      <AppContent />
    </AuthProvider>
  );
}

export default App;