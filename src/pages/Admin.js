import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Admin() {
  const { auth } = useContext(AuthContext);

  if (auth.user?.role !== 'admin') {
    return <h2>Access Denied</h2>;
  }

  return <h2>Welcome Admin</h2>;
}
