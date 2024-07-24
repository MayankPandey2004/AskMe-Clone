import React, { useState, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import Side from "../Side";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 850px;
  background-color: #f9f9f9;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 50px auto;
`;

const ProfileItem = styled.div`
  margin: 10px 0;
  font-size: 1.2em;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 20px;
`;

const ProfileTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: bold;
  color: #ff6b6b;`;


function AnswerPage() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = "http://localhost:8080/home";
        const response = await fetch(url, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProfile(result);
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the profile data: ", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-container">
      <TopBar
        isLoggedIn={true}
        showProfile={true}
        loginAreaHeight="0px"
        profile={() => { }}
        login={() => { }}
        navigate={navigate}
        Logout={() => { }}
      />
      <MainNav tabs={["Home", "Profile", "Questions", "Answers", "Logout"]} />
      <div style={{display:'flex'}}>
        <div style={{flex:2}}>
      <ProfileContainer>
        <ProfileTitle>Answers</ProfileTitle>
        <ProfileItem>
          <strong>Name?</strong> <br />{profile.name}
        </ProfileItem>
      </ProfileContainer>
      </div>
      <div style={{flex:1}}>
        <Side/>
      </div>
      </div>
      
    </div>
  );
}

export default AnswerPage;
