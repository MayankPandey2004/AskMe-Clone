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
import { IoHomeSharp } from "react-icons/io5";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdQuestionAnswer } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import ImageUrl from "../assets/chrome.png";

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

const ProfileButton = styled.button`
  text-decoration: none;
  color: #ff6b6b;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 400;
  
  
  &:hover {
    color: white;
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

const ProfileImage = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 5px;
  &:hover {
    background-color: gray;
    transition: background-color 0.1s ease-in;
  }
`

const AskBox = styled.textarea`
  font-size: 14px;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px #ff6b6b;
  }
`

const AskButton = styled.button`
  width: 85%;
  padding: 10px;
  margin-right: 10px;
  background-color: #343a40;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #555E66;
    transition: background-color 0.2s ease-in;
  }
`

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
      console.log('Logged In');
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

        if (result.valid) {
          setIsLoggedIn(true);
        }
        console.log(result);
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

  const Logout = async () => {
    localStorage.setItem('auth', false);
    setIsLoggedIn(false);
    setShowProfile(false);
  }

  return (
    <div className="header-container">
      <div className="top-bar-content">
        <LoginArea style={{ height: loginAreaHeight }}>
          <div style={{ display: 'flex', flex: 1, paddingLeft: 150, paddingRight: 20 }}>
            <ProfileImage></ProfileImage>
            <h5>Welcome testusername1</h5>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h5 style={{ marginLeft: 50 }}>Quick Links</h5>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 50, flex: 1 }}>
              <ProfileButton onClick={() => navigate('/profile')}><IoHomeSharp size={14} style={{ marginBottom: 5 }} /> Profile Page</ProfileButton>
              <ProfileButton onClick={() => navigate('/question')}><FaCircleQuestion size={14} style={{ marginBottom: 5 }} /> Questions Asked</ProfileButton>
              <ProfileButton onClick={() => navigate('/answer')}><MdQuestionAnswer size={14} style={{ marginBottom: 5 }} /> Answers</ProfileButton>
              <ProfileButton onClick={() => Logout()}><BiLogOut size={16} style={{ marginBottom: 2 }} /> Logout</ProfileButton>
            </div>
          </div>
        </LoginArea>
        <div className="top-bar">

          <div className="left-section">
            <LeftSectionButton onClick={isLoggedIn ? profile : login}>
              {isLoggedIn ? 'Profile' : 'Login'}
              {isLoggedIn}
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
      <div className="page-title" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div>
            <h3 style={{ margin:90, marginTop:60, marginBottom:20}}>Welcome to Ask me</h3>
            <p style={{ color: 'white', fontWeight: '300',  margin:90, marginBottom:20, marginTop:20, }}>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque.</p>
            <div style={{ display: 'flex',olor: 'white', fontWeight: '300',  margin:90, marginBottom:20, marginTop:20, }}>
              <AskButton>About Us</AskButton>
              <AskButton>Ask Question</AskButton>
            </div>
          </div>
        </div>
        <div style={{ flex: 1.5, alignItems: 'flex-end' }}>
          <AskBox placeholder='Ask a question and you will be sure to find an answer!' style={{ padding: 15, backgroundColor: 'rgba(253, 233, 233, 0.75)', borderWidth: 0, position: 'absolute', zIndex: 100, height: '25vh', width: '50vw', top: showProfile ? 550 : 250 , right: 100, resize: 'none',  transition: 'top 0.5s ease-in-out' }}></AskBox>
          <img src={ImageUrl} alt='searchimage' />
        </div>
      </div>
      <div className="thirdbar">
        <QandABar />
        <Side />
      </div>
    </div>
  );
}

export default MainPage;