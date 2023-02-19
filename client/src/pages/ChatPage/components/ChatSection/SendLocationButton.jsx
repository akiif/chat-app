import React, { useState } from 'react'
import { toast } from 'react-toastify';

// import socket context
import { useSocket } from '../../../../contexts/SocketProvider';

function SendLocationButton() {
  const socket  = useSocket();
  const [disableButton, setDisableButton] = useState(false);

  const sendLocation = (coords) => {
    socket.emit('sendLocation', coords, (error, cbMessage) => {
      if (error) {
        toast.error(error)
      } else {
        console.log(cbMessage);
      }
    })
  }

  const handleClick = () => {
    setDisableButton(true);

    if (!navigator.geolocation) {
      return toast.error("Geolocation is not supported by your browser.")
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      
      sendLocation(location);

      setDisableButton(false);
    });
  }

  return (
    <button 
      onClick={handleClick} 
      className='send-location-btn'
      disabled={disableButton}
    >
      Send Location
    </button>
  )
}

export default SendLocationButton;