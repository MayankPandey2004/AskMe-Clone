import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import Side from "../Side";
import UserImage from "../assets/profilephoto.png";
import useAuth from "../hooks/useAuth";
import { lineSpinner } from "ldrs";

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

const Input = styled.input`
  padding: 8px;
  font-size: 1em;
  width: 100%;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = `http://localhost:8080/user_profile?user_id=${auth.user_id}`;
        const response = await fetch(url, { credentials: "include" });
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

  const handleEditProfile = () => {
    setIsEditing(true); 
  };

  const handleSaveProfile = async () => {
    try {
      const url = `http://localhost:8080/update_profile`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsEditing(false);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <l-line-spinner
          size="40"
          stroke="3"
          speed="1"
          color="#333"
        ></l-line-spinner>
      </div>
    );
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <div className="header-container">
      <TopBar
        isLoggedIn={true}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        loginAreaHeight="0px"
        profile={() => {}}
        login={() => {}}
        navigate={navigate}
        Logout={() => {}}
      />
      <MainNav />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <ProfileContainer>
            <ProfileTitle>
              About {profile.username} <hr style={{ color: "gray" }} />
            </ProfileTitle>
            <ProfileContent>
              <div>
              <ProfileImage>
                <img src={UserImage} alt="Profile" />
              </ProfileImage>
              {isEditing ? (
                  <AskButton onClick={handleSaveProfile}>Save</AskButton>
                ) : (
                  <AskButton onClick={handleEditProfile}>
                    Edit Profile
                  </AskButton>
                )}
                </div>
              <ProfileDetails>
                <ProfileItem>
                  {isEditing ? (
                    <div>
                      <label style={{ fontSize: 13 }}>User ID:</label>
                      <Input
                        name="user_id"
                        value={profile.user_id}
                        onChange={handleChange}
                        disabled
                        style={{ marginTop: 0, fontSize: 14 }}
                      />
                      <label style={{ fontSize: 13 }}>Email:</label>
                      <Input
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        style={{ marginTop: 0, fontSize: 14 }}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>
                        User ID:{" "}
                        <span style={{ color: "gray" }}>{profile.user_id}</span>
                      </p>
                      <p>
                        Email:{" "}
                        <span style={{ color: "gray" }}>{profile.email}</span>
                      </p>
                    </div>
                  )}
                </ProfileItem>
              </ProfileDetails>
            </ProfileContent>
          </ProfileContainer>
          <QuestionButton
            style={{ marginRight: 20, marginLeft: 50 }}
            onClick={() => navigate("/question")}
          >
            Questions Asked
          </QuestionButton>
          <QuestionButton onClick={() => navigate("/answer")}>
            Questions Answered
          </QuestionButton>
        </div>
        <div style={{ flex: 1 }}>
          <Side />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
