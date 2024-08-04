import React, { useState } from "react";
import "./QuestionCard.css";
import UserImage from "./assets/profilephoto.png";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AnswerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #ff6b6b;
  align-self: flex-start;
  width: 100%;
`;

const AnswerCard = ({ answers }) => {
  const navigate = useNavigate();
  const [likedAnswers, setLikedAnswers] = useState([]);
  const like = (question_id) => {
    console.log(likedAnswers);
    if (likedAnswers.includes(question_id)) {
      setLikedAnswers(likedAnswers.filter(id => id !== question_id));
    } else {
      setLikedAnswers([...likedAnswers, question_id]);
    }
  };

  return (
    <div
      className="question-card"
      style={{
        marginLeft: 40,
        padding: 30,
        paddingBottom: 10,
        flexDirection: "column",
        backgroundColor: "white",
        boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <AnswerTitle>Answers ({answers.length})</AnswerTitle>
      <hr style={{marginTop: 5, marginBottom: 30}}/>
      {answers.map((answer, index) => (
        <div key={answer.id}>
          {index > 0 && <hr style={{ marginBottom: 30 }} />}
          <div className="question-content">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    borderRadius: "50%",
                    height: 50,
                    width: 50,
                    backgroundColor: "lightgray",
                    marginRight: 10,
                  }}
                >
                  <img
                    src={UserImage}
                    alt="profile-photo"
                    style={{ height: 50, width: 50, borderRadius: "50%" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      marginBottom: 0,
                    }}
                  >
                    {answer.username}
                  </p>
                  <div style={{ display: "flex" }}>
                    <FaThumbsUp
                      style={{ marginRight: 5, marginTop: 3 , cursor: 'pointer'}}
                      color={likedAnswers.includes(answer.answer_id)?"#6AC3F0":'gray'}
                      onClick={() => like(answer.answer_id)}
                    />
                    <p style={{ color: "gray", fontSize: 16 }}>{likedAnswers.includes(answer.answer_id)?answer.likes+1:answer.likes}</p>
                    <FaThumbsDown
                      style={{ marginLeft: 5, marginRight: 5, marginTop: 5, cursor: 'pointer' }}
                      color="gray"
                    />
                    <p style={{ color: "gray", fontSize: 16 }}>
                      {answer.dislikes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 10,
                marginTop: 10,
              }}
              onClick={() => navigate("/addanswer")}
            >
              {answer.answer}
            </p>
            <p style={{ fontSize: 16 }}>{answer.description}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnswerCard;
