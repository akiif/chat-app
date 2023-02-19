import React from 'react';
import { Link } from 'react-router-dom';

import ChatAppIcon from "../assets/images/chat-icon.svg";

function Logo() {
  return (
    <Link to="/" className='logo link-hover'>
      <img src={ChatAppIcon} alt="" className='logo-img' />
      <p>chat-app</p>
    </Link>
  );
}

export default Logo;