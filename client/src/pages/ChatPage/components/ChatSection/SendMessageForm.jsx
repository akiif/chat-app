import React, { useState } from 'react';
import { toast } from 'react-toastify';

// import socket context
import { useSocket } from '../../../../contexts/SocketProvider';

function SendMessageForm() {
  const socket  = useSocket();
  const [sendMessageText, setSendMessageText] = useState('');

  const sendMessage = () => {
    socket.emit('sendMessage', sendMessageText, (error, cbMessage) => {
      if (error) {
        toast.error(error);
      } else {
        console.log(cbMessage);
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sendMessageText === '') {
      return toast.error("Message cannot be empty!")
    }

    sendMessage();
    setSendMessageText('');
  }

  return (
    <form className='send-message-form' onSubmit={handleSubmit}>
      <input 
        type="text" 
        name='message'
        value={sendMessageText}
        placeholder='Message'
        autoComplete='off'
        onChange={(e) => setSendMessageText(e.target.value)}
      />
      <button type='submit'>Send</button>
    </form>
  );
}

export default SendMessageForm;