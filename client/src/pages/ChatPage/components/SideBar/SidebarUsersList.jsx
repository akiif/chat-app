import React from 'react'
import { useSelector } from 'react-redux';

function SidebarUsersList() {
  const { users } = useSelector((state) => state.roomData);
  return (
    <div className='users-list-container'>
      <div>
        <h3 className='users-list-title'>Users</h3>
      </div>
      <ul className='users-list word-overflow-wrap'>
        { users.map((user) => (<li className='users-list-item' key={user.id}>{user.username}</li>)) }
      </ul>
    </div>
  )
}

export default SidebarUsersList;