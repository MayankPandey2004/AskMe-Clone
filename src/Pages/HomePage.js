import React, { useState, useEffect } from 'react';
import '../App.css';
import Side from '../Side';
import QandABar from '../QandABar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../Modal.css';
import 'ldrs/helix';
import { lineSpinner } from 'ldrs'
import ImageUrl from "../assets/chrome.png";
import TopBar from '../components/TopBar';
import MainNav from '../components/MainNav';

lineSpinner.register()

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

const SubmitButton = styled.button`
margin-right: 10px;
background-color: #ff6d6d;
color: white;
border: none;
cursor: pointer;
height: 35px;
font-size: 14px;
border-radius: 2px;

&:hover {
  background-color: #343a40;
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
      <TopBar
        isLoggedIn={isLoggedIn}
        showProfile={showProfile}
        loginAreaHeight={loginAreaHeight}
        profile={profile}
        login={login}
        navigate={navigate}
        Logout={Logout}
      />
      <MainNav tabs={tabs} />
      <div className="page-title" style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div>
            <h3 style={{ margin:90, marginTop:60, marginBottom:20}}>Welcome to Ask me</h3>
            <p style={{ color: 'white', fontWeight: '300',  margin:90, marginBottom:20, marginTop:20, }}>Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus at elit quis urna adipiscing iaculis. Curabitur vitae velit in neque dictum blandit. Proin in iaculis neque.</p>
            <div style={{ display: 'flex',olor: 'white', fontWeight: '300',  margin:90, marginBottom:20, marginTop:20, }}>
              <AskButton>About Us</AskButton>
              <AskButton onClick={()=>navigate('/askquestion')}>Ask Question</AskButton>
            </div>
          </div>
        </div>
        <div style={{ flex: 1.5, alignItems: 'flex-end' }}>
          <AskBox placeholder='Ask a question and you will be sure to find an answer!' style={{ padding: 15, backgroundColor: 'rgba(253, 233, 233, 0.75)', borderWidth: 0, position: 'absolute', zIndex: 100, height: '25vh', width: '50vw', top: showProfile ? 550 : 250 , right: 100, resize: 'none',  transition: 'top 0.5s ease-in-out' }}></AskBox>
          <img src={ImageUrl} alt='searchimage' />
          <SubmitButton style={{
          position: 'absolute',
          right: '100px',
          zIndex:100,
          top: showProfile ? '85vh' : '50vh',
          transition: 'top 0.5s ease-in-out',
          width:95,
        }}>Ask Now</SubmitButton>
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