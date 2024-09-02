import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 60vw;
  background-color: white;
  color: #333;
  border-radius: 2px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  margin-left: 40px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.02);
  margin: 10px 0;
  border: 0.5px solid #ddd;
  border-radius: 4px;
  color: #131d52;
  outline: none;
  resize: none;
  &:focus {
    border-color: #131d52;
    transition: border-color 0.2s ease-in-out;
  }
`;

const AskButton = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  margin-right: 10px;
  background-color: #131d52;
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

const AnswerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #131d52;
  align-self: flex-start;
  width: 100%;
`;

function LeaveAnswerCard() {
  return (
    <div style={{ display: "flex" }}>
      <CardContainer>
        <AnswerTitle>Leave An Answer</AnswerTitle>
        <hr style={{marginTop:5}} />
        <div style={{ display: "flex", flex: 5 }}>
          <Textarea />
        </div>
        <AskButton>Post Your Answer</AskButton>
      </CardContainer>
      <div style={{ marginRight: 50 }}></div>
    </div>
  );
}

export default LeaveAnswerCard;
