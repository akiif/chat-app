import React from 'react'
import { useSelector } from 'react-redux';

function SidebarRoomHeader() {
  const { room } = useSelector((state) => state.roomData);
  return (
    <div className='room-title-div word-overflow-wrap'>
      <h2 className='room-title'>{ room }</h2>
    </div>
  )
}

export default SidebarRoomHeader;