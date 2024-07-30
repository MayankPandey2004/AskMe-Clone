import React from 'react';
import '../App.css';

const MainNav = () => {
  const tabs = ["Home", "Ask Question", "Questions", "Users", "Contact Us"];

  return (
    <div className="main-nav">
      <div className="logo">
        <span style={{ fontSize: '36px' }}>?</span>ASK me
      </div>
      <ul className="nav-list">
        <a href="/" role="button" className="nav-item">
          <li
            className='nav-list-item'
            style={{ padding: 10, borderRadius: 2 }}
          >
            {tabs[0]}
          </li>
        </a>
        <a href="/askquestion" role="button" className="nav-item">
          <li
            className='nav-list-item'
            style={{ padding: 10, borderRadius: 2 }}
          >
            {tabs[1]}
          </li>
        </a>
        <a href="/question" role="button" className="nav-item">
          <li
            className='nav-list-item'
            style={{ padding: 10, borderRadius: 2 }}
          >
            {tabs[2]}
          </li>
        </a>
        <a href="/profile" role="button" className="nav-item">
          <li
            className='nav-list-item'
            style={{ padding: 10, borderRadius: 2 }}
          >
            {tabs[3]}
          </li>
        </a>
        <a href="/contact" role="button" className="nav-item">
          <li
            className='nav-list-item'
            style={{ padding: 10, borderRadius: 2 }}
          >
            {tabs[4]}
          </li>
        </a>
      </ul>
    </div>
  );
};

export default MainNav;
