import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import Side from "../Side";
import UserImage from '../assets/profilephoto.png';
import useAuth from "../hooks/useAuth";
import { lineSpinner } from 'ldrs';

lineSpinner.register();

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 850px;
  background-color: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 50px auto;
  margin-bottom: 20px;
`;

const AskButton = styled.button`
  width: 150px;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;

  &:hover {
    background-color: #e65a5a;
    transition: background-color 0.2s ease-in;
  }
`;

const QuestionButton = styled.button`
  width: 150px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;

  &:hover {
    background-color: #ff6b6b;
    transition: background-color 0.2s ease-in;
  }
`;

const ProfileItem = styled.div`
  margin: 10px 0;
  font-size: 1.2em;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 60px;
`;

const ProfileTitle = styled.h2`
  font-size: 2em;
  font-weight: bold;
  color: #ff6b6b;
  align-self: flex-start;
  width: 100%;
`;

const ProfileContent = styled.div`
  display: flex;
`;

const ProfileImage = styled.div`
  margin-left: 20px;
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 1px solid #e0e0e0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileDetails = styled.div`
  flex: 1;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2em;
`;

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = `http://localhost:8080/user_profile?user_id=${auth.user_id}`;
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProfile(result.user_info);
        setIsLoading(false);
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [auth.user_id]);

  if (isLoading) return <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <l-line-spinner
      size="40"
      stroke="3"
      speed="1"
      color="#333"
    ></l-line-spinner>
  </div>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <div className="header-container">
      <TopBar
        isLoggedIn={true}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        loginAreaHeight="0px"
        profile={() => { }}
        login={() => { }}
        navigate={navigate}
        Logout={() => { }}
      />
      <MainNav />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2 }}>
          <ProfileContainer>
            <ProfileTitle>About {profile.username} <hr style={{ color: 'gray' }} /></ProfileTitle>
            <ProfileContent>
              <ProfileImage>
                <img src={UserImage} alt="Profile" />
              </ProfileImage>
              <ProfileDetails>
                <ProfileItem>
                  <p>User ID: {profile.user_id}</p>
                  <p>Email: {profile.email}</p>
                </ProfileItem>
              </ProfileDetails>
            </ProfileContent>
            <AskButton>Edit profile</AskButton>
          </ProfileContainer>
          <QuestionButton style={{ marginRight: 20, marginLeft: 50 }}  onClick={()=>navigate('/question')}>Questions Asked</QuestionButton>
          <QuestionButton onClick={()=>navigate('/answer')}>Questions Answered</QuestionButton>
        </div>
        <div style={{ flex: 1 }}>
          <Side />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
