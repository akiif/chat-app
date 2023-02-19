import React, { useCallback, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../../assets/css/chat.css';

// import socket context
import { useSocket } from '../../contexts/SocketProvider';

// import components
import ChatSidebar from './components/SideBar/ChatSidebar';
import ChatSection from './components/ChatSection/ChatSection';

// import redux actions
import { clearUserDetails } from '../../state/features/user/userSlice';
import { clearMessages } from '../../state/features/messages/messagesSlice';
import { clearRoomData } from '../../state/features/roomData/roomDataSlice';

function ChatPage() {
  const socket  = useSocket();
  const dispatch = useDispatch();
  const { username, room } = useSelector((state) => state.user);

  const [errorMessage, setErrorMessage] = useState('You need to join a room to access the chat page!');

  const socketFormSubmitCallback = useCallback((error, message) => {
    if (error) {
      console.log(error);
      setErrorMessage(error);
      toast.error(error);
      dispatch(clearUserDetails());
      dispatch(clearMessages());
      dispatch(clearRoomData());
    } else {
      console.log(message);
    }
  });

  useEffect(() => {
    joinChat();
  }, []);

  const joinChat = () => {
    if (!username || !room) return;
    socket.emit('SEND_JOIN_REQUEST', { username, room }, socketFormSubmitCallback);
  }

  if (!username || !room) {
    toast.error(errorMessage);
    return <Navigate to='/' />
  }

  return (
    <div className='chat-page'>
      <ChatSidebar />
      <ChatSection />
    </div>
  );
}

export default ChatPage;