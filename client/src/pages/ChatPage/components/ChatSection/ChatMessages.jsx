import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import socket context
import { useSocket } from '../../../../contexts/SocketProvider';

// import redux actions
import { addMessage } from '../../../../state/features/messages/messagesSlice';

// import components
import ChatMessageItem from './ChatMessageItem';

function ChatMessages() {
  const socket  = useSocket();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  
  const messagesEndRef = useRef(null);
  const messageListRef = useRef(null);

  const newMessage = useCallback((message) => {
    dispatch(addMessage(message));
  });

  const autoScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    socket.on('message', newMessage);
    autoScroll();

    return () => {
      socket.off('message');
    }

  }, [socket, newMessage])

  return (
    <div className='chat-messages' ref={messageListRef}>
      {
        messages.map((message, index) => {
          return (
            <ChatMessageItem
              key={index}
              message={message}
            />
          )
        })
      }
      <div className="scroll-helper" ref={messagesEndRef}></div>
    </div>
  )
}

export default ChatMessages;