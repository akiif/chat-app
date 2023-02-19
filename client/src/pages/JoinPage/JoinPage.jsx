import React from 'react';
import '../../assets/css/join-form.css';

// import components
import JoinForm from './components/JoinForm';
import Navbar from '../../components/Navbar';

function JoinPage() {
  return (
    <div className='join-page'>
      <Navbar />
      <JoinForm />
    </div>
  );
}

export default JoinPage;