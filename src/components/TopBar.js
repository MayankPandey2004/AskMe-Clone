import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { IoHomeSharp } from "react-icons/io5";
import { FaCircleQuestion } from "react-icons/fa6";
import { MdQuestionAnswer } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import UserImage from '../assets/profilephoto.png'
import useAuth from '../hooks/useAuth';

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
`;

const TopBar = ({ isLoggedIn, showProfile, setShowProfile, login}) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loginAreaHeight, setLoginAreaHeight] = useState('0px');

  useEffect(() => {
    if (showProfile) {
      setLoginAreaHeight('300px');
    } else {
      setLoginAreaHeight('0px');
    }
  }, [showProfile]);

  const profile = () => {
    setShowProfile(!showProfile);
  }

  const Logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      localStorage.setItem('auth', false);
      setShowProfile(false);
      navigate('/');
      window.location.reload();
    } catch (e) {
      console.error("An error occurred while logging out: ", e);
    }
  };
  
  return(
  <div className="top-bar-content">
    <LoginArea style={{ height: loginAreaHeight }}>
      <div style={{ display: 'flex', flex: 1, paddingLeft: 150, paddingRight: 20 }}>
        <ProfileImage><img src={UserImage} alt="user-image" style={{width:'100%', height:'100%'}}/></ProfileImage>
        <h5>Welcome {auth.username}</h5>
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
          {isLoggedIn ? <div style={{display:'flex', alignItems:'center'}}><ProfileImage style={{height:30,width:30}}><img src={UserImage} alt="user-image" style={{width:'100%', height:'100%'}}/></ProfileImage>{auth.username}</div> : 'Login'}
        </LeftSectionButton>
        <LeftSectionButton onClick={()=>navigate('/askquestion')}>Add Post</LeftSectionButton>
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
  )
};

export default TopBar;
