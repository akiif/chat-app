import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

// import socket context
import { useSocket } from '../../../../contexts/SocketProvider';

// import redux actions
import { clearUserDetails } from '../../../../state/features/user/userSlice';
import { clearMessages } from '../../../../state/features/messages/messagesSlice';
import { clearRoomData } from '../../../../state/features/roomData/roomDataSlice';

function JoinNewRoomButton() {
  const socket  = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clearUserDetails());
    dispatch(clearMessages());
    dispatch(clearRoomData());
    socket.disconnect();
    socket.connect();
    navigate('/');
  }
  return (
    <button className='join-new-btn' onClick={handleClick}>Join New Room</button>
  )
}

export default JoinNewRoomButton