import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import AdminPage from './components/AdminPage';
import ViewerPage from './components/ViewerPage';
import './App.css';
import { BACKEND_URL } from './components/config';

const socket = io(BACKEND_URL);

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    socket.on('role', (assignedRole) => {
      setRole(assignedRole);
    });

    return () => {
      socket.off('role');
    };
  }, []);

  return (
    <div>
      {role === 'admin' && <AdminPage socket={socket} />}
      {role === 'viewer' && <ViewerPage socket={socket} />}
      {!role && <p>Loading...</p>}
    </div>
  );
}

export default App;