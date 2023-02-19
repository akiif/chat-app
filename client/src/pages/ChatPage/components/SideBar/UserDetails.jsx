import React from 'react';
import { useSelector } from 'react-redux';

function UserDetails() {
  const { username } = useSelector((state) => state.user);
  return (
    <div className='user-details'>
      <div className="">
        {`Your username: `}
        <span className="text-muted">
          {username}
        </span>
      </div>
    </div>
  );
}

export default UserDetails;