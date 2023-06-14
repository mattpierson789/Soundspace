import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <div className="search-bar">
        <p>Search For Songs!</p>
      </div>
      <div className="header-index-banner">
        <h1>Your Feed</h1>
      </div>
    </div>
  );
}

export default Header;

