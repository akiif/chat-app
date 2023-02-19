import React from 'react';

// import components
import SendMessageForm from './SendMessageForm';
import SendLocationButton from './SendLocationButton';

function ComposeMessage() {
  return (
    <div className='compose-message'>
      <SendMessageForm />
      <SendLocationButton />
    </div>
  );
}

export default ComposeMessage;