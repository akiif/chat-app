import React from 'react';

// import components
import ChatMessages from './ChatMessages';
import ComposeMessage from './ComposeMessage';

function ChatSection() {
  return (
    <div className='chat-section'>
      <ChatMessages />
      <ComposeMessage />
    </div>
  );
}

export default ChatSection;