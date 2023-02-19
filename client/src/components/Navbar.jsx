import React from 'react'
import "../assets/css/navbar.css";

// import components
import Logo from './Logo';

function Navbar() {
  return (
    <nav className='navbar'>
      <Logo />
      <div className="navbar-elements"></div>
    </nav>
  );
}

export default Navbar