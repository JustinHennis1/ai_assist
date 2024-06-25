import React from 'react';
import tmdblogo from '../images/tmdblogo.svg';
import '../css/footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='logocontainer'>
        <img src={tmdblogo} alt="TMDb Logo" className='logo' />
      </div>
      <div className='linkscontainer'>
        <a href="/watchlist" className='link'>View Watchlist</a>
        <a href="/sign-in" className='link'>Sign In</a>
        <a href="/create-account" className='link'>Create Account</a>
      </div>
      <div className='copyright'>
        &copy; 2024 Microsoft AI Hackathon Submission. Created by Justin Hennis.
      </div>
    </footer>
  );
};

export default Footer;
