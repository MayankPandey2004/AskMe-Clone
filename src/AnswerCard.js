import React from "react";
import "./QuestionCard.css";
import UserImage from "./assets/profilephoto.png";
import styled from "styled-components";
import LikeButton from "./components/LikeButton";

const AnswerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #ff6b6b;
  align-self: flex-start;
  width: 100%;
`;

const AnswerCard = ({ answers }) => {
  
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
      <AnswerTitle>Answers ({answers?answers.length:'0'})</AnswerTitle>
      <hr style={{marginTop: 5, marginBottom: 30}}/>
      
      {answers?.map((answer, index) => (
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
                  <LikeButton answer={answer}/>
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
