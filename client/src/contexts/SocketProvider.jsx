import React, { useContext, createContext, useEffect, useState } from 'react';
import socketio from "socket.io-client";
import { SOCKET_URL } from '../config/url.config.json';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const socket = socketio.connect(SOCKET_URL);

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  );
}