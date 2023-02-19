import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import components
import SidebarRoomHeader from './SidebarRoomHeader';
import SidebarUsersList from './SidebarUsersList';
import UserDetails from './UserDetails';
import JoinNewRoomButton from './JoinNewRoomButton';

// import socket context
import { useSocket } from '../../../../contexts/SocketProvider';

// import redux actions
import { updateRoomData } from '../../../../state/features/roomData/roomDataSlice';

function ChatSidebar() {
  const socket  = useSocket();
  const dispatch = useDispatch();

  const newRoomData = useCallback((roomData) => {
    dispatch(updateRoomData(roomData))
  });

  useEffect(() => {
    socket.on('roomData', newRoomData);

    return () => {
      socket.off('roomData');
    }
  }, [socket, newRoomData]);

  return (
    <div className='chat-sidebar'>
      <SidebarRoomHeader />
      <SidebarUsersList />
      <UserDetails />
      <JoinNewRoomButton />
    </div>
  );
}

export default ChatSidebar;