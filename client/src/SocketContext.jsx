import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const newSocket = io('wss://api.stallersoftware.com/');
    setSocket(newSocket);

    newSocket.on('connect_error', (error) => {
      setConnectionError(true);
      setSocketConnected(false);
    });

    newSocket.on('connect', () => {
      console.log('WebSocket connection successful!');
      setSocketConnected(true);
      setConnectionError(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, socketConnected, connectionError }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export { SocketProvider, useSocket };
