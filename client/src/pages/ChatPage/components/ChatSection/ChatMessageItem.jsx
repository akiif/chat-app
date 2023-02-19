import React from 'react'
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function ChatMessageItem({ message }) {
  const { username } = useSelector((state) => state.user);
  const { type, content, createdAt } = message;
  const formattedCreatedAt = dayjs(createdAt).format('h:mm a');

  let divClassName = '';
  let contentClassName = '';
  let messageDetailsClassName = '';

  if (username === message.username) {
    divClassName = 'message-item sender';
    contentClassName = 'message-content sender-content';
    messageDetailsClassName = 'message-details sender-details';
  } else {
    divClassName = 'message-item';
    contentClassName = 'message-content';
    messageDetailsClassName = 'message-details';
  }

  if (type === 'url') {
    return (
      <div className={divClassName}>
        <p className={messageDetailsClassName}>
          <span className='message-username'>{message.username}</span>
          <span className='message-meta'>{formattedCreatedAt}</span>
        </p>
        <div className={contentClassName}>
          <a href={message.url} target="_blank" rel="noopener noreferrer">{content}</a>
        </div>
      </div>
    )
  }

  return (
    <div className={divClassName}>
      <p className={messageDetailsClassName}>
        <span className='message-username'>{message.username}</span>
        <span className='message-meta'>{formattedCreatedAt}</span>
      </p>
      <div className={contentClassName}>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default ChatMessageItem