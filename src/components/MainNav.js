import React from 'react';
import '../App.css';

const MainNav = ({ tabs }) => (
  <div className="main-nav">
    <div className="logo">
      <span style={{ fontSize: '36px' }}>?</span>ASK me
    </div>
    <ul className="nav-list">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className='nav-list-item'
          style={index === 0 ? { backgroundColor: '#ff6b6b', padding: 10, borderRadius: 2 } : { padding: 10, borderRadius: 2 }}
        >
          <a href="/" role="button" className="nav-item">
            {tab}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default MainNav;
