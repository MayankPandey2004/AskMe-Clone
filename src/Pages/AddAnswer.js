import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import MainNav from "../components/MainNav";
import QuestionCard from "../QuestionCard";
import Side from "../Side";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { lineSpinner } from "ldrs";
import AnswerCard from "../AnswerCard";

lineSpinner.register();

function AddAnswerPage() {
  const [showProfile, setShowProfile] = useState(false);
  const [question, setQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionsAnswers = async () => {
      try {
        const url = `http://localhost:8080/answers?question_id=5`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (!response) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setQuestion(result.questions);
        setAnswers(result.answers);
      } catch (e) {
        console.error(
          "An error occurred while fetching the question data: ",
        );
        setError(e.message);
        setIsLoading(false);
      }
    };
    fetchQuestionsAnswers();
  }, [auth.user_id]);
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
      <Side />
      <QuestionCard questions={question} />
      <AnswerCard answers={answers}/>
    </div>
  );
}

export default AddAnswerPage;
