import React, { useState, useContext } from 'react';
import { login } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      setAuth({ token: res.data.token, user: res.data.user });
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
          required
        />
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      <div style={{ textAlign: 'center' }}>
        <p>Don't have an account? </p>
        <Link 
          to="/signup" 
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '10px'
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
