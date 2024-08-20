import React, { useState, useEffect } from "react";
import "../App.css";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import Side from "../Side";
import useAuth from "../hooks/useAuth";
import "../QuestionCard.css";
import { BsFillPinFill } from "react-icons/bs";
import UserImage from "../assets/profilephoto.png";
import { AiFillQuestionCircle } from "react-icons/ai";
import { lineSpinner } from 'ldrs';
import QuestionLikeButton from "../components/QuestionLikeButton";

lineSpinner.register();

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
`;

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
`;

const QuestionTitle = styled.p`
  &:hover{
    color: #ff6b6b;
    cursor: pointer;
  }
`;

function SearchPage() {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';
  const tagQuery = location.state?.tname || '';
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const url = `http://localhost:8080/search?text=${searchQuery}&tag=${tagQuery}`;
        console.log(url);
        const response = await fetch(url, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setQuestions(result.search_questions);
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the question data: ", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [auth.user_id, searchQuery, tagQuery]);

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <l-line-spinner
          size="40"
          stroke="3"
          speed="1"
          color="#333"
        ></l-line-spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="header-container">
      <TopBar
        isLoggedIn={true}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        profile={() => navigate("/profile")}
        login={() => {}}
        navigate={navigate}
        Logout={() => {}}
      />
      <MainNav tabs={["Home", "Profile", "Questions", "Answers", "Logout"]} />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2, marginTop: 10 }}>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <div
                key={index}
                className="question-card"
                style={{
                  marginLeft: 40,
                  padding: 30,
                  paddingBottom: 10,
                  flexDirection: "column",
                  width:'65vw'
                }}
              >
                <div className="question-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          borderRadius: "50%",
                          height: 50,
                          width: 50,
                          backgroundColor: "lightgray",
                        }}
                      >
                        <img
                          src={UserImage}
                          alt="profile-photo"
                          style={{ height: 50, width: 50 }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: 22,
                          fontWeight: "400",
                          marginTop: 10,
                          marginLeft: 5,
                        }}
                      >
                        {question.username}
                      </p>
                    </div>
                    <QuestionButton style={{ marginTop: 10 }}>
                      <AiFillQuestionCircle style={{ marginRight: 2 }} />
                      Question
                    </QuestionButton>
                  </div>
                  <QuestionTitle 
                    style={{ fontSize: 22, fontWeight: "600", marginBottom: 20 }} 
                    onClick={() => navigate('/addanswer', { state: { questionId: question.question_id }})}
                  >
                    <BsFillPinFill style={{ marginRight: 5 }} /> {question.question}
                  </QuestionTitle>
                  <p style={{ fontSize: 16 }}>
                    {question.description}
                  </p>
                </div>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <AskButton>Add Answer to the Question</AskButton>
                  <div style={{ display: "flex", marginTop: 8, marginRight: 10 }}>
                    <QuestionLikeButton question={question} />
                    <p style={{ color: "gray", fontSize: 16 }}>{question.like}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ marginLeft: 40, marginTop:30, textAlign: 'center', }}>
                <h3 style={{color:'#ff6b6b'}}>No questions found matching your search.</h3>
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <Side />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;