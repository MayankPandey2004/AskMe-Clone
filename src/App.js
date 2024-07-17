import React, { useState, useEffect } from 'react';
import './App.css';
import Side from './Side';
import QandABar from './QandABar';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";


const LeftSectionButton = styled.button`
  text-decoration: none;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
`;

const LoginArea = styled.div`
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #343a40;
    transition: background-color 0.2s ease-in;
  }
`;

const SignUpButton = styled.button`
  width: 50%;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #343a40;
    transition: background-color 0.2s ease-in;
  }
`;

function Header() {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginAreaHeight, setLoginAreaHeight] = useState('0px');

  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = "http://localhost:8080/home";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTabs(result.middel_bar);
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the data: ", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    getApiData();
  }, []);

  useEffect(() => {
    if (loginStatus) {
      setLoginAreaHeight('300px');
    } else {
      setLoginAreaHeight('0px');
    }
  }, [loginStatus]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-container">
      <div className="top-bar-content">
        <LoginArea style={{ height: loginAreaHeight }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: 150, paddingRight: 20 }}>
            <h5>Login</h5>
            <input className='search-login' placeholder='Username' />
            <input className='search-login' placeholder='Password' />
            <LoginButton>Log in</LoginButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 150, paddingLeft: 20 }}>
            <h5>Register Now</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Morbi adipiscing gravdio, sit amet suscipit risus ultrices eu.Fusce viverra neque at purus laoreet consequa.Vivamus vulputate posuere nisl quis consequat.</p>
            <SignUpButton>Create an account</SignUpButton>
          </div>
        </LoginArea>
        <div className="top-bar">
          <div className="left-section">
            <LeftSectionButton onClick={() => { setLoginStatus(!loginStatus) }}>Login Area</LeftSectionButton>
            <LeftSectionButton>Add post</LeftSectionButton>
            <LeftSectionButton>Badges</LeftSectionButton>
            <LeftSectionButton>Buy now</LeftSectionButton>
          </div>
          <div className="right-section">
            <div style={{display:'flex',alignItems:'center'}}><AiOutlineSearch /></div>
            <input
              type="text"
              placeholder="Search here ..."
              className='search-input'
              style={{ backgroundColor: 'transparent', color: 'white' }}
            />
          </div>
        </div>
      </div>
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
              <a href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" className="nav-item">
                {tab}
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">Action</a></li>
                <li><a className="dropdown-item" href="/">Another action</a></li>
                <li><a className="dropdown-item" href="/">Something else here</a></li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="page-title">Add post</div>
      <div className="breadcrumb">Home / Add post</div>
      <div className="thirdbar">
        <QandABar />
        <Side />
      </div>
    </div>
  );
}

export default Header;