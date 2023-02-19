import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// import socket context
import { useSocket } from '../../../contexts/SocketProvider';

// import redux actions
import { setUserDetails } from '../../../state/features/user/userSlice';

// import components
import GenerateRandomNameButton from './GenerateRandomNameButton';

function JoinForm() {
  const socket  = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeRooms, setActiveRooms] = useState([]);
  const [selectedActiveRoom, setSelectedActiveRoom] = useState('default');
  const [formInput, setFormInput] = useState({
    username: '',
    room: ''
  });

  const handleChange = (e) => {
    setFormInput((oldFormInput) => {
      return {
        ...oldFormInput,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSelectInputChange = (e) => {
    
    setSelectedActiveRoom(e.target.value);
    setFormInput(oldFormInput => {
      return {
        ...oldFormInput,
        room: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formInput.username === '' || formInput.room === '') {
      return toast.error("Username or room cannot be empty!");
    }
    
    dispatch(setUserDetails(formInput));

    navigate('/chat');
  }

  useEffect(() => {
    socket.emit('GET_ACTIVE_ROOMS');
  }, []);

  const activeRoomsUpdate = useCallback((rooms) => {
    setActiveRooms(rooms);
  });

  useEffect(() => {
    socket.on('activeRooms', activeRoomsUpdate);

    return () => {
      socket.off('activeRooms');
    }
  }, [socket, activeRoomsUpdate])

  return (
    <div className='join-form-container'>
      <form className='join-form' onSubmit={handleSubmit}>
        <div className="join-header">
          <h2>Join</h2>
        </div>
        <div className="input-container">
          <label htmlFor="username" className='join-label'>Username</label>
          <input 
            type="text" 
            name="username" 
            placeholder='Enter your username' 
            className='join-input'
            required
            autoComplete='off'
            autoFocus
            value={formInput.username}
            onChange={handleChange}
          />
          <GenerateRandomNameButton
            setFormInput={setFormInput}
            type='username'
            wordSize={2}
          />
        </div>
        <div className="input-container">
          <label htmlFor="room" className='join-label'>Room</label>
          <p className="room-join-type-text">Join a new room</p>
          <input 
            type="text" 
            name="room" 
            placeholder='Enter the room name' 
            className='join-input'
            required
            autoComplete='off'
            value={formInput.room}
            onChange={handleChange}
          />
          <GenerateRandomNameButton
            setFormInput={setFormInput}
            type='room'
            wordSize={1}
          />
        </div>
        { activeRooms.length === 0 ? <p className='no-active-room'>No Active Room Present!</p> : 
          <div className="input-container">
            <p className="room-join-type-text align-left">or select an active room:</p>
            <select 
              name="active-rooms" 
              className='active-rooms text-muted'
              value={selectedActiveRoom} 
              onChange={handleSelectInputChange}
            >
              <option disabled value='default' className='default-value-muted text-muted'> -- Select an active room -- </option>
              {
                activeRooms.map((activeRoom, index) => (
                  <option value={activeRoom} key={index}>{activeRoom}</option>
                ))
              }
            </select>
          </div>
        }
        <button type='submit' className='join-btn'>JOIN</button>
      </form>
    </div>
  );
}

export default JoinForm;