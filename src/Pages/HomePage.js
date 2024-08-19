import React, { useState, useEffect } from "react";
import "../App.css";
import Side from "../Side";
import QandABar from "../QandABar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../Modal.css";
import "ldrs/helix";
import { lineSpinner } from "ldrs";
import ImageUrl from "../assets/chrome.png";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import useAuth from "../hooks/useAuth";

lineSpinner.register();

const AskBox = styled.textarea`
  font-size: 14px;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px #ff6b6b;
  }
`;

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
    background-color: #555e66;
    transition: background-color 0.2s ease-in;
  }
`;

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
`;

function MainPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loginAreaHeight, setLoginAreaHeight] = useState("0px");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const getApiData = async () => {
      try {
        const url = auth.user_id
          ? `http://localhost:8080/home?user_id=${auth.user_id}`
          : `http://localhost:8080/home`;
        console.log(url);
        const response = await fetch(url, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setResult(data);
        if (data.valid) {
          setAuth((prevAuth) => ({
            ...prevAuth,
            username: data.user_info.username,
          }));
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
  }, [auth.user_id, setAuth]);

  useEffect(() => {
    if (showProfile) {
      setLoginAreaHeight("300px");
    } else {
      setLoginAreaHeight("0px");
    }
  }, [showProfile]);

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
  if (error) return <div>Error: {error}</div>;

  const login = () => {
    navigate("/login");
  };

  const profile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="header-container">
      <TopBar
        isLoggedIn={isLoggedIn}
        setShowProfile={setShowProfile}
        showProfile={showProfile}
        loginAreaHeight={loginAreaHeight}
        profile={profile}
        login={login}
        navigate={navigate}
        username={isLoggedIn ? result.user_info.username : "User"}
      />
      <MainNav />
      <div className="page-title" style={{ display: "flex", height:'40vh' }}>
        <div style={{ flex: 1 }}>
          <div>
            <h3 style={{ margin: 90, marginTop: 60, marginBottom: 20 }}>
              Welcome to Ask me
            </h3>
            <p
              style={{
                color: "white",
                fontWeight: "300",
                margin: 90,
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              Duis dapibus aliquam mi, eget euismod sem scelerisque ut. Vivamus
              at elit quis urna adipiscing iaculis. Curabitur vitae velit in
              neque dictum blandit. Proin in iaculis neque.
            </p>
            <div
              style={{
                display: "flex",
                olor: "white",
                fontWeight: "300",
                margin: 90,
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <AskButton>About Us</AskButton>
              <AskButton onClick={() => navigate("/askquestion")}>
                Ask Question
              </AskButton>
            </div>
          </div>
        </div>
        <div
          style={{ flex: 1.75, alignItems: "flex-end", position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
              backgroundImage: `url(${ImageUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "90% 100%",
              padding: "45px",
              paddingTop:"85px",
              display:'flex',
              justifyContent:'center',
              alignItems:'center'
              
            }}
          >
            <AskBox
              placeholder="Ask a question and you will be sure to find an answer!"
              style={{
                backgroundColor: 'rgba(253, 233, 233, 0.75)',
                borderWidth: 0,
                height: "100%",
                width: "90%",
                resize: "none",
                padding: "15px",
                boxSizing: "border-box",
                color:'#ff6b6b'
              }}
            />
            <SubmitButton
              style={{
                position: "absolute",
                bottom: "18%",
                right: "10%",
                width: 95,
              }}
            >
              Ask Now
            </SubmitButton>
          </div>
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
