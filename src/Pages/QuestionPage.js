import React, { useState, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
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

const BackButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #e55b5b;
    transition: background-color 0.2s ease-in;
  }
`;

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const url = "http://localhost:8080/profile";
//         const response = await fetch(url, {
//           credentials: 'include'
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         setProfile(result);
//         setIsLoading(false);
//       } catch (e) {
//         console.error("An error occurred while fetching the profile data: ", e);
//         setError(e.message);
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-container">
      <div className="top-bar-content">
        <div className="top-bar">
          <div className="left-section">
            <BackButton onClick={() => navigate("/")} className="back-button">
              Back
            </BackButton>
          </div>
        </div>
      </div>
      <ProfileContainer>
        <ProfileTitle>Asked Questions</ProfileTitle>
        <ProfileItem>
          <strong>Name?</strong> <br />name
        </ProfileItem>
      </ProfileContainer>
    </div>
  );
}

export default ProfilePage;
