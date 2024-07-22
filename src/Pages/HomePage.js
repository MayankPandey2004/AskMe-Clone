import React, { useState, useEffect } from 'react';
import '../App.css';
import Side from '../Side';
import QandABar from '../QandABar';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import '../Modal.css';
import 'ldrs/helix';
import { lineSpinner } from 'ldrs'

lineSpinner.register()

const LeftSectionButton = styled.button`
  text-decoration: none;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-weight: 600;
  
  
  &:hover {
    color: #333;
    transition: color 0.1s ease-in;
  }
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

function MainPage() {

  const navigate = useNavigate();
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginAreaHeight, setLoginAreaHeight] = useState('0px');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = "http://localhost:8080/home";
        const response = await fetch(url, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setTabs(result.middel_bar);

        // Check if the cookie is valid
        if (result.valid) {
          setIsLoggedIn(true);
        }

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
    if (showProfile) {
      setLoginAreaHeight('300px');
    } else {
      setLoginAreaHeight('0px');
    }
  }, [showProfile]);

  if (isLoading) return <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <l-line-spinner
      size="40"
      stroke="3"
      speed="1"
      color="#333"
    ></l-line-spinner>
  </div>;
  if (error) return <div>Error: {error}</div>;

  const login = () => {
    navigate('/login');
  }

  const profile = () => {
    setShowProfile(!showProfile);
  }

  return (
    <div className="header-container">
      <div className="top-bar-content">
        <LoginArea style={{ height: loginAreaHeight }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: 150, paddingRight: 20 }}>
            <h5>Welcome testusername1</h5>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h5 style={{marginLeft:50}}>Quick Links</h5>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Profile Page</LeftSectionButton>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Profile Page</LeftSectionButton>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Profile Page</LeftSectionButton>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Profile Page</LeftSectionButton>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Mesages</LeftSectionButton>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Mesages</LeftSectionButton>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Mesages</LeftSectionButton>
                <LeftSectionButton style={{color:'#ff6b6b'}}>Mesages</LeftSectionButton>
              </div>
            </div>
          </div>
        </LoginArea>
        <div className="top-bar">

          <div className="left-section">
            <LeftSectionButton onClick={isLoggedIn ? profile : login}>
              {isLoggedIn ? 'Profile' : 'Login'}
            </LeftSectionButton>
            <LeftSectionButton>Add Post</LeftSectionButton>
          </div>
          <div className="right-section">
            <div style={{ display: 'flex', alignItems: 'center' }}><AiOutlineSearch /></div>
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
              <a href="/" role="button" className="nav-item">
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="page-title">Add Post</div>
      <div className="breadcrumb">Home / Add Post</div>
      <div className="thirdbar">
        <QandABar />
        <Side />
      </div>
    </div>
  );
}

export default MainPage;
