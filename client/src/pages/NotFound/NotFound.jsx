import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/404.css';

function NotFound() {
  return (
    <section className='not-found-page'>
      <h1 className='not-found-404'>404</h1>
      <h2 className='not-found'>Page Not Found</h2>
      <p className='not-found-p'>The page you were looking for doesn't exist.</p>
      <Link to="/" className="not-found-btn">HOME</Link>
    </section>
  );
}

export default NotFound;