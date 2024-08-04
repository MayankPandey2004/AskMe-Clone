import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import Side from "../Side";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { lineSpinner } from "ldrs";
import AnswerCard from "../AnswerCard";
import styled from "styled-components";
import UserImage from "../assets/profilephoto.png";
import { FaThumbsUp } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import LeaveAnswerCard from "./LeaveAnswerCard";

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

function AddAnswerPage() {
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const { questionId } = location.state || {};
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionsAnswers = async () => {
      try {
        const url = `http://localhost:8080/answers?question_id=${questionId}`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (!response) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setQuestion(result.questions);
        setAnswers(result.answers);
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the question data: ");
        setError(e.message);
      }
    };
    fetchQuestionsAnswers();
  }, [auth.user_id,questionId]);
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

  return (
    <div>
      <TopBar
        isLoggedIn={true}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        login={() => {
          navigate("/login");
        }}
        navigate={navigate}
      />
      <MainNav />

      <div style={{ display: "flex" }}>
        <div>
          <div
            className="question-card"
            style={{
              marginLeft: 40,
              padding: 30,
              paddingBottom: 10,
              flexDirection: "column",
              display: "flex",
              marginTop: 30,
              boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="question-content">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderRadius: "50%",
                      height: 40,
                      width: 40,
                      backgroundColor: "lightgray",
                    }}
                  >
                    <img
                      src={UserImage}
                      alt="profile-photo"
                      style={{ height: 40, width: 40 }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      marginTop: 5,
                      marginLeft: 5,
                    }}
                  >
                    {question.username}
                  </p>
                </div>
                <QuestionButton>
                  <AiFillQuestionCircle style={{ marginRight: 2 }} />
                  Question
                </QuestionButton>
              </div>
              <p
                style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}
                onClick={() => navigate("/addanswer")}
              >
                {question.question}
              </p>
              <p style={{ fontSize: 16 }}>{question.discription}</p>
            </div>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <AskButton>Add Answer to the Question</AskButton>
              <div style={{ display: "flex", marginTop: 8, marginRight: 10 }}>
                <FaThumbsUp
                  style={{ marginRight: 5, marginTop: 3 }}
                  color="gray"
                />
                <p style={{ color: "gray", fontSize: 16 }}>{question.like}</p>
              </div>
            </div>
          </div>
          <AnswerCard answers={answers} />
          <LeaveAnswerCard/>
        </div>
        <Side />
      </div>
      
    </div>
  );
}

export default AddAnswerPage;
