import React, { useState, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import Side from "../Side";
import useAuth from "../hooks/useAuth";
import '../QuestionCard.css';
import { FaThumbsUp } from "react-icons/fa";
import { BsFillPinFill } from "react-icons/bs";
import UserImage from '../assets/profilephoto.png';
import { AiFillQuestionCircle } from "react-icons/ai";

const AskButton = styled.button`
  width: 30%;
  padding: 10px;
  margin-right: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  font-size: 14px;

  &:hover {
    background-color: #343a40;
    transition: background-color 0.2s ease-in;
  }
`

const QuestionButton = styled.div`
  width: 10%;
  margin-right: 10px;
  display: flex;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  height: 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 12px;
`

function QuestionPage() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = 'http://localhost:8080/home';
        // const url = `http://localhost:8080/user_question?user_id=${auth.user_id}`;
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
  }, [auth.user_id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="header-container">
      <TopBar
        isLoggedIn={true}
        showProfile={true}
        loginAreaHeight="0px"
        profile={() => {navigate('/profile')}}
        login={() => {}}
        navigate={navigate}
        Logout={() => { }}
      />
      <MainNav tabs={["Home", "Profile", "Questions", "Answers", "Logout"]} />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2, marginTop: 10 }}>
          <div className="question-card" style={{ marginLeft: 40, padding: 30, paddingBottom: 10, flexDirection: 'column' }}>
            <div className="question-content">
            
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10}}>
              <div style={{display:'flex'}}>
                <div style={{borderRadius:'50%', height:50, width:50, backgroundColor:'lightgray'}}>
                  <img src={UserImage} alt="profile-photo" style={{height:50, width:50}} />
                </div>
                <p style={{ fontSize: 22, fontWeight: '400', marginTop: 10, marginLeft:5 }}>Test Username</p>
              </div>
              <QuestionButton style={{marginTop:10}}><AiFillQuestionCircle style={{marginRight:2}}/>Question</QuestionButton>
              </div>
              <p style={{ fontSize: 22, fontWeight: '600', marginBottom: 20 }}><BsFillPinFill style={{marginRight:5}}/> {profile.question}jafsnj jsdnavc jnvajerlkgnvljekrn ajvna jeklrsnvoakel svjknvkfv?</p>
              <p style={{ fontSize: 16 }}>jafsnj jsdnavc jnvajerlkgnvljekrn ajvna jeklrsnvoakel svjknvkfv jafsnj jsdnavc jnvajerlkgnvljekrn ajvna jeklrsnvoakel svjknvkfv jafsnj jsdnavc jnvajerlkgnvljekrn ajvna jeklrsnvoakel svjknvkfv jafsnj jsdnavc jnvajerlkgnvljekrn ajvna jeklrsnvoakel svjknvkfv jafsnj jsdnavc jnvajerlkgnvljekrn ajvna jeklrsnvoakel svjknvkfv jafsnj jsdnavc jnvajerlkgnvljekrn ajvna jeklrsnvoakel svjknvkfv</p>
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AskButton>Add Answer to the Question</AskButton>
              <div style={{ display: 'flex', marginTop: 8, marginRight: 10 }}>
                <FaThumbsUp style={{ marginRight: 5, marginTop: 2 }} color="gray" />
                <p style={{ color: 'gray', fontSize: 16 }}>likes</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Side />
        </div>
      </div>

    </div >
  );
}

export default QuestionPage;
